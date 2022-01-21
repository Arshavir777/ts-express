import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import jwt from "jsonwebtoken";
import { HttpErrors } from "../utils/errors";

export function authenticate(req: Request, _: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new HttpErrors().Unauthorized();
  }

  jwt.verify(token, config.jwt.secret, async (err: any, user: any) => {
    if (err) {
      return next(
        new HttpErrors().InvalidCredentials("Invalid access token", [
          err.message,
        ])
      );
    }

    req.currentUser = { id: user.id, email: user.email };

    next();
  });
}
