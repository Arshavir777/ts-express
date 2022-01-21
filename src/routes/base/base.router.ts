import { Application, Router } from "express";

export abstract class BaseRouter {
  app: Application;
  name: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }
  getName() {
    return this.name;
  }

  abstract configureRoutes(): void;
}
