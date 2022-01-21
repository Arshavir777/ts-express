import { Application } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import UserCtrl from "../controllers/user.controller";
import { BaseRouter } from "./base/base.router";

export class UserRouter extends BaseRouter {
  constructor(app: Application) {
    super(app, "UserRoutes");
  }

  configureRoutes() {
    this.app.get("/users", authenticate, UserCtrl.getAll);
    return this.app;
  }
}
