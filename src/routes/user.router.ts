import { Application } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import UserController from "../controllers/user.controller";
import { BaseRouter } from "./base/base.router";

export class UserRouter extends BaseRouter {
  constructor(app: Application) {
    super(app, "UserRoutes");
  }

  configureRoutes() {
    this.app.get("/users", authenticate, UserController.find);
    return this.app;
  }
}
