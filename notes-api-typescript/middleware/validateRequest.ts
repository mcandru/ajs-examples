import { checkSchema, validationResult } from "express-validator";
import { BAD_REQUEST } from "../utils/HttpError.js";
import type { Request, Response, NextFunction, RequestHandler } from "express";

export const validate = (schema: any): RequestHandler[] => [
  ...checkSchema(schema),
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(BAD_REQUEST).json({
        error: error.msg,
      });
    }
    next();
  },
];
