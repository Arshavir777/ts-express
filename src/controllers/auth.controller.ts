import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { BaseController } from "./base/base.controller";
import { HttpErrors } from "../utils/errors";
import { signJwt } from "../utils/auth";
import Container, { Service } from "typedi";

/**
 * @class AuthController
 */
@Service()
class AuthController extends BaseController {
  constructor(private readonly userRepository: UserRepository) {
    super();
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
        or: [{ email: login }, { login }],
      });
      if (!user) {
        throw new HttpErrors().NotFound("User not found");
      }

      const isValidated = user.checkPassword(password);
      if (!isValidated) {
        throw new HttpErrors().InvalidCredentials();
      }

      delete user.password;

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
      delete user.password;
      return this.successResponse(res, user);
    } catch (error) {
      next(error);
    }
  };
}

export default Container.get(AuthController);
