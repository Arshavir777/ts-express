import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { BaseController } from "./base/base.controller";
import { HttpErrors } from "../utils/errors";
import { signJwt } from "../utils/auth";

/**
 * @class AuthController
 */
class AuthController extends BaseController {
  userRepository: UserRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  /**
   * Login
   * @param req Request
   * @param res Response
   */
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { login, password } = req.body;

      const user = await this.userRepository.findOne({
        $or: [{ email: login }, { login }],
      });
      if (!user) {
        throw new HttpErrors().NotFound("User not found");
      }

      const isValidated = user.checkPassword(password);
      if (!isValidated) {
        throw new HttpErrors().InvalidCredentials();
      }

      return this.successResponse(res, {
        accessToken: signJwt(user),
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Register
   * @param req Request
   * @param res Response
   */
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { login, email, password } = req.body;
      const user = await this.userRepository.create({ login, email, password });
      return this.successResponse(res, user);
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
