import { Response } from "express";

export class BaseController {
  successResponse(res: Response, data: any, status: number = 200) {
    res.json(data).status(status);
  }
}
