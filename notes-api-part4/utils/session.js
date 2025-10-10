import session from "express-session";
import MongoStore from "connect-mongo";
import User from "../models/user.js";
import { UNAUTHORIZED, FORBIDDEN, HttpError } from "./HttpError.js";

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  name: "sessionId",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions",
    ttl: 24 * 60 * 60, // 1 day in seconds. Mongo TTL index will remove it after that
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production with HTTPS
    sameSite: "strict",
  },
});

// Middleware to check if user is authenticated
export const requireAuth = async (req, _res, next) => {
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
export const requireRole = (...roles) => {
  return async (req, _res, next) => {
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

    // Attach user to request for use in route handlers
    req.user = user;
    next();
  };
};

// Middleware to check if user is admin
export const requireAdmin = requireRole("admin");
