import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../utils/HttpError.js";

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
