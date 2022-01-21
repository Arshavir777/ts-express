import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { config } from "../config";
import jwt from "jsonwebtoken";

export function authenticate(
  req: Request & { currentUser: any },
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization Required");
  }

  jwt.verify(token, config.jwt.secret, async (err: any, data: any) => {
    if (err) {
      return res.status(403).send(err.message);
    }

    const currentUser = await User.findById(data.id);

    if (!currentUser) {
      return res.send("Current user not found").status(404);
    }

    req.currentUser = currentUser;

    next();
  });
}
