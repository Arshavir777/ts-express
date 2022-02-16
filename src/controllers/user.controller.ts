import { Request, Response } from "express";
import Container, { Service } from "typedi";
import { UserRepository } from "../repositories/user.repository";
import { BaseController } from "./base/base.controller";

/**
 * @class UserController
 */
@Service()
class UserController extends BaseController {
  constructor(private readonly userRepository: UserRepository) {
    super();
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

export default Container.get(UserController);
