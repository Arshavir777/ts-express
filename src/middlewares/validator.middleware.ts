import { NextFunction, Request, Response } from "express";
import { checkSchema, Schema, validationResult } from "express-validator";

export function validate(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // check schema
    await checkSchema(schema).run(req);

    // get validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        data: {
          errors: errors.array(),
        },
      });
    }

    // continue
    next();
  };
}
