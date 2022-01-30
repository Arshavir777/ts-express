import express, { Application } from "express";
import logger from "morgan";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { BaseRouter } from "./routes/base/base.router";
import { PingRouter } from "./routes/ping.router";
import { AuthRouter } from "./routes/auth.router";
import { UserRouter } from "./routes/user.router";
import { MediaRouter } from "./routes/media.router";
import { errorHandler } from "./middlewares/error.middleware";

import db from "./datasources/mongo.datasource";
import { ObjectId } from "mongoose";

export type TApplicationConfig = {
  port: number;
  host: string;
};

declare global {
  namespace Express {
    interface Request {
      currentUser: { id: ObjectId; email: string };
    }
  }
}

export class BootstrapApplication {
  app: Application;
  options: TApplicationConfig;
  url: string;
  routes: Array<BaseRouter> = [];

  constructor(options: TApplicationConfig) {
    this.options = options;
  }

  boot() {
    this.app = express();
  }

  async start(server: http.Server): Promise<void> {
    try {
      const { host, port } = this.options;
      await db.connect();
      server.listen(port, host, () => {
        this.initPreMiddlewares();
        this.initRoutes();
        this.initPostMiddlewares();
        console.log(`Server is running at http://${host}:${port}`);
        console.log(`Try http://${host}:${port}/ping`);
      });
    } catch (error) {
      console.log("AppBootstrapError: Please check configs and restart app.");
    }
  }

  initRoutes(): void {
    this.routes.push(new PingRouter(this.app));
    this.routes.push(new AuthRouter(this.app));
    this.routes.push(new UserRouter(this.app));
    this.routes.push(new MediaRouter(this.app));
  }

  initPreMiddlewares() {
    this.app.use(logger("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  initPostMiddlewares() {
    this.app.use(errorHandler);
  }

  getInstance(): Application {
    return this.app;
  }
}
