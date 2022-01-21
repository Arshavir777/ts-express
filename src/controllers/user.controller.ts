import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";

/**
 * @class UserController
 */
class UserController {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Ping
   * @param req Request
   * @param res Response
   */
  ping = async (req: Request, res: Response): Promise<void> => {
    const users = await this.userRepository.find({});
    res.json({
      users,
      status: "ok",
      data: new Date(),
    });
  };

  /**
   * Find
   * @param req Request
   * @param res Response
   */
  find = async (req: Request, res: Response): Promise<void> => {
    res.json({
      users: await this.userRepository.find({}),
    });
  };
}

export default new UserController();
