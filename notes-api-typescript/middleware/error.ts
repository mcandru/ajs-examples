import {
  HttpError,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../utils/HttpError.js";
import type { Request, Response, NextFunction } from "express";

export const errorHandler = async (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  if (error instanceof HttpError && error.status < 500) {
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof Error) {
    console.error("Error:", error.message);
  }

  return res
    .status(INTERNAL_SERVER_ERROR)
    .json({ error: "Internal Server Error" });
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(NOT_FOUND).send({ error: "Unknown endpoint" });
};
