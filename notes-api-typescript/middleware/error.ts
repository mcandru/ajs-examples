import {
  HttpError,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../utils/HttpError.js";
import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof HttpError && error.status < 500) {
    res.status(error.status).json({ error: error.message });
    return;
  }

  if (error instanceof Error) {
    console.error("Error:", error.message);
  }

  res.status(INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
};

export const unknownEndpoint = (_req: Request, res: Response): void => {
  res.status(NOT_FOUND).send({ error: "Unknown endpoint" });
};
