import { Application } from "express";
import PingController from "../controllers/ping.controller";
import { BaseRouter } from "./base/base.router";

export class PingRouter extends BaseRouter {
  constructor(app: Application) {
    super(app, "PingRoutes");
  }

  configureRoutes() {
    this.app.get('/ping', PingController.ping);
    return this.app;
  }
}
