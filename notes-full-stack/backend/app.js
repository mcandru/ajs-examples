import express from "express";
import { errorHandler, unknownEndpoint } from "./middleware/error.js";
import {
  requireRole,
  requireAdmin,
  sessionMiddleware,
} from "./middleware/auth.js";
import notesRouter from "./controllers/notes.js";
import authRouter from "./controllers/auth.js";
import adminRouter from "./controllers/admin.js";
import helmet from "helmet";

const createApp = () => {
  const app = express();

  // Remember, middleware functions are called in the order that they're encountered

  // Trust first proxy (required for Render to properly handle HTTPS)
  // https://expressjs.com/en/guide/behind-proxies.html
  app.set("trust proxy", 1);

  // Middleware to parse JSON from request bodies.
  app.use(express.json());

  // Security middleware
  app.use(helmet());

  // Serving static files for serving frontend in production
  app.use(express.static("dist"));

  // Session middleware
  app.use(sessionMiddleware());

  app.use("/api/auth", authRouter);
  app.use("/api/notes", requireRole("user"), notesRouter);
  app.use("/api/admin", requireAdmin, adminRouter);

  // Important that this is at the end so that it only handles requests that did not match previous routes
  app.use(unknownEndpoint);
  // Important that this is at the end so that it handles errors from all routes
  app.use(errorHandler);

  return app;
};

export default createApp;
