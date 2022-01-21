import { Application } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import MediaCtrl from "../controllers/media.controller";
import { BaseRouter } from "./base/base.router";
import { validate } from "../middlewares/validator.middleware";
import {
  deletePhotosReqValidatorSchema,
  deleteAlbumReqValidatorSchema,
  updateAlbumTitleReqValidatorSchema
} from "../validators";

export class MediaRouter extends BaseRouter {
  constructor(app: Application) {
    super(app, "MediaRoutes");
  }

  configureRoutes() {
    this.app.post("/media/load-photos", authenticate, MediaCtrl.loadPhotos);
    this.app.get("/media/get-photos", MediaCtrl.getPhotos);
    this.app.delete(
      "/media/delete-photos/:photoIds",
      authenticate,
      validate(deletePhotosReqValidatorSchema),
      MediaCtrl.deletePhotos
    );
    this.app.delete(
      "/media/delete-album/:albumIds",
      authenticate,
      validate(deleteAlbumReqValidatorSchema),
      MediaCtrl.deleteAlbums
    );
    this.app.patch(
      "/media/change-album-title/:albumId",
      authenticate,
      validate(updateAlbumTitleReqValidatorSchema),
      MediaCtrl.updateAlbumTitle
    );
    return this.app;
  }
}
