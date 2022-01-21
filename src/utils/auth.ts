import jwt from "jsonwebtoken";
import { config } from "../config";
import { IUser } from "../models/user.model";

export function signJwt(user: IUser) {
  return jwt.sign({ id: user._id, email: user.email }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}
