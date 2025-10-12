import { checkSchema, validationResult } from "express-validator";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "./HttpError.js";

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

export const errorHandler = async (error, _req, res, _next) => {
  console.error("Error:", error.message);

  const { status, message } = error;

  if (!status || !message) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }

  res.status(status).json({ error: message });
};

export const unknownEndpoint = (_req, res) => {
  res.status(NOT_FOUND).send({ error: "Unknown endpoint" });
};
