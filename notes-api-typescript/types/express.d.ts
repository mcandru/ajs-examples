import "express";
import type { UserDocument } from "../models/user.js";

// Extending the request object to include an optional user when authenticated

declare module "express" {
  interface Request {
    /** User object attached by authentication middleware (requireAuth/requireRole) */
    user?: UserDocument;
  }
}
