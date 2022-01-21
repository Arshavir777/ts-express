import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { BaseController } from "./base/base.controller";

/**
 * @class UserController
 */
class UserController extends BaseController {
  userRepository: UserRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  /**
   * Get users list
   * @param req Request
   * @param res Response
   */
  getAll = async (req: Request, res: Response): Promise<void> => {
    const users = await this.userRepository.find({}, "_id login email", {
      populate: ["photos"],
    });
    this.successResponse(res, users);
  };
}

export default new UserController();
