import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../utils/HttpError.js";

export const errorHandler = async (error, _req, res, _next) => {
  const { status, message } = error;

  // Only log unexpected errors (5xx) or errors without a status code
  // Don't log expected client errors (4xx) like 401, 404, etc.
  if (!status || status >= 500) {
    console.error("Error:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  }

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
