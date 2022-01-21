import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

/**
 * Custom error handler to standardize error objects
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function errorHandler(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let appError = err;

  if (!(err instanceof AppError)) {
    appError =
      process.env.NODE_ENV === "development"
        ? new AppError(err.name, err.status, [err.message])
        : new AppError("Something went wrong.");
  }

  res.status((appError as AppError).statusCode).json(appError);
}

export { errorHandler };
