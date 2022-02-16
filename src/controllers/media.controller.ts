import { NextFunction, Request, Response } from "express";
import { AppError, HttpErrors } from "../utils/errors";
import { PhotoRepository, AlbumRepository } from "../repositories";
import JPService from "../services/jp.service";
import { BaseController } from "./base/base.controller";
import { TJpPhoto, IPhoto } from "../models/photo.model";
import { IAlbum } from "../models/album.model";
import { uniqBy } from "lodash";
import { paginate } from "../utils/paginate";
import Container, { Service } from "typedi";

@Service()
class MediaController extends BaseController {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private readonly albumRepository: AlbumRepository
  ) {
    super();
  }

  /**
   * Load/Fetch photos from json-placeholder and store.
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  loadPhotos = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const photos = await JPService.fetchPhotos({ limit: 10 });

      if (!photos || !photos.length) {
        throw new AppError("Photos not loaded", 400);
      }

      const albumsInsertData: IAlbum[] = uniqBy(photos, "albumId").map(
        (photo: TJpPhoto, index: number) => ({
          albumId: photo.albumId,
          title: (index + 1).toString(),
          ownerId: req.currentUser.id,
        })
      );

      const photosInsertData: IPhoto[] = photos.map((photo: TJpPhoto) => ({
        ...photo,
        ownerId: req.currentUser.id,
      }));

      // insert albums
      await this.albumRepository.insertMany(albumsInsertData);

      // insert photos
      const insertedPhotos = await this.photoRepository.insertMany(
        photosInsertData
      );

      this.successResponse(res, insertedPhotos);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all photos.
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  getPhotos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ownerId } = req.query;
      const options = paginate(req);
      const conditions = {
        ...(ownerId ? { ownerId } : {}),
      };

      const photos = await this.photoRepository.findWithRelations(
        conditions,
        options
      );

      return this.successResponse(res, photos);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete photos by Ids.
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  deletePhotos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { photoIds } = req.params;

      const { deletedCount: deletedPhotosCount } =
        await this.photoRepository.deleteMany({
          _id: { $in: photoIds },
        });

      return this.successResponse(res, { photoIds, deletedPhotosCount });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete albums by Ids.
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  deleteAlbums = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { albumIds } = req.params;

      const { deletedCount: deletedAlbumsCount } =
        await this.albumRepository.deleteMany({
          albumId: { $in: albumIds },
        });

      const { deletedCount: deletedPhotosCount } =
        await this.photoRepository.deleteMany({
          albumId: { $in: albumIds },
        });

      return this.successResponse(res, {
        albumIds,
        deletedAlbumsCount,
        deletedPhotosCount,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update albums title by ID;
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  updateAlbumTitle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { albumId } = req.params;
      const { title } = req.body;

      const album = await this.albumRepository.findOneAndUpdate(
        { albumId },
        { title }
      );

      if (!album) {
        throw new HttpErrors().NotFound("Album not found");
      }

      return this.successResponse(res, album);
    } catch (error) {
      next(error);
    }
  };
}

export default Container.get(MediaController);
