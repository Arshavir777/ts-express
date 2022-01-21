import { Application } from "express";
import AuthCtrl from "../controllers/auth.controller";
import { BaseRouter } from "./base/base.router";
import {
  loginReqValidatorSchema,
  registerReqValidatorSchema,
} from "../validators";
import { validate } from "../middlewares/validator.middleware";

export class AuthRouter extends BaseRouter {
  constructor(app: Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes() {
    this.app.post(
      "/auth/login",
      validate(loginReqValidatorSchema),
      AuthCtrl.login
    );
    this.app.post(
      "/auth/register",
      validate(registerReqValidatorSchema),
      AuthCtrl.register
    );
  }
}
