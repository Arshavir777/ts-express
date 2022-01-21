import { Request, Response } from "express";
import { BaseController } from "./base/base.controller";

class PingController extends BaseController {
  ping = async (req: Request, res: Response): Promise<void> => {
    this.successResponse(res, {
      date: new Date(),
      headers: req.headers,
      ip: req.ip,
    });
  };
}

export default new PingController();
