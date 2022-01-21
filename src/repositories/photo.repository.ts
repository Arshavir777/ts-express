import { BaseRepository } from "./base/base.repository";
import Photo, { IPhoto } from "../models/photo.model";
import { FilterQuery, QueryOptions } from "mongoose";

export class PhotoRepository extends BaseRepository<IPhoto> {
  constructor() {
    super(Photo);
  }

  findWithRelations(
    conditions: FilterQuery<IPhoto>,
    options: QueryOptions
  ): Promise<any> {
    return this.model
      .aggregate([
        { $match: conditions },
        ...(options.skip ? [{ $skip: options.skip }] : []),
        ...(options.limit ? [{ $limit: options.limit }] : []),
        {
          $lookup: {
            from: "users",
            localField: "ownerId",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $unwind: "$owner",
        },
        {
          $lookup: {
            from: "albums",
            localField: "albumId",
            foreignField: "albumId",
            as: "album",
          },
        },
        {
          $unwind: "$album",
        },
        {
          $project: {
            "owner.password": 0,
            "album.ownerId": 0,
            ownerId: 0,
            albumId: 0,
          },
        },
      ])
      .exec();
  }
}
