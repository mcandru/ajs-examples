import { checkSchema, validationResult } from "express-validator";
import { BAD_REQUEST } from "../utils/HttpError.js";

export const validate = (schema) => [
  ...checkSchema(schema),
  (req, res, next) => {
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
