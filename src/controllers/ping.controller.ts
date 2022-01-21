import { Request, Response } from "express";

class PingController {
  async ping(_: Request, res: Response): Promise<void> {
    res.json({
      status: "ok",
      data: new Date(),
    });
  }
}

export default new PingController();
