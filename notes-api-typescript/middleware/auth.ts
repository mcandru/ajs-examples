import session from "express-session";
import MongoStore from "connect-mongo";
import { User } from "../models/user.js";
import { UNAUTHORIZED, FORBIDDEN, HttpError } from "../utils/HttpError.js";
import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";

type Roles = "admin" | "user";

export const sessionMiddleware = () => {
  if (!process.env.SESSION_SECRET) {
    throw Error("SESSION_SECRET is not defined in environment variables");
  }

  return session({
    secret: process.env.SESSION_SECRET,
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production with HTTPS
      sameSite: "strict",
    },
  });
};

// Middleware to check if user is authenticated
export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.userId) {
    throw new HttpError(UNAUTHORIZED, "Authentication required");
  }

  const user = await User.findById(req.session.userId);
  if (!user) {
    throw new HttpError(UNAUTHORIZED, "User not found");
  }

  req.user = user; // Attach user to request for use in route handlers
  next();
};

// Middleware to check if user has a specific role
export const requireRole = (...roles: Roles[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.session || !req.session.userId) {
      throw new HttpError(UNAUTHORIZED, "Authentication required");
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      throw new HttpError(UNAUTHORIZED, "User not found");
    }

    if (!roles.includes(user.role)) {
      throw new HttpError(FORBIDDEN, "Forbidden: Insufficient permissions");
    }

    req.user = user; // Attach user to request for use in route handlers
    next();
  };
};

// Middleware to check if user is admin
export const requireAdmin = requireRole("admin");
