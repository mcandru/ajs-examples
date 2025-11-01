import express from "express";
import { User } from "../models/user.js";
import {
  HttpError,
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} from "../utils/HttpError.js";
import { registerSchema, loginSchema } from "../utils/validators.js";
import { validate } from "../middleware/validateRequest.js";
import type { Request, Response } from "express";

const router = express.Router();

// User registration
router.post(
  "/register",
  validate(registerSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HttpError(BAD_REQUEST, "Email already exists");
    }

    // Hash password and create user
    const passwordHash = await User.hashPassword(password);
    const user = await User.create({
      email,
      passwordHash,
    });

    // Set session
    req.session.userId = user._id.toString();

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  }
);

// User login
router.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(UNAUTHORIZED, "Invalid credentials");
    }

    // Verify password
    const passwordCorrect = await user.verifyPassword(password);
    if (!passwordCorrect) {
      throw new HttpError(UNAUTHORIZED, "Invalid credentials");
    }

    // Set session
    req.session.userId = user._id.toString();

    res.status(200).json({
      message: "Login successful",
      user,
    });
  }
);

// Logout endpoint
router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      throw new HttpError(INTERNAL_SERVER_ERROR, "Could not log out");
    }
    res.clearCookie("sessionId"); // Clear the session cookie
    res.status(200).json({ message: "Logout successful" });
  });
});

// Check authentication status
router.get("/me", async (req: Request, res: Response) => {
  if (req.session && req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      res.status(200).json({
        authenticated: true,
        user,
      });
    } else {
      res.status(401).json({ authenticated: false });
    }
  } else {
    res.status(401).json({ authenticated: false });
  }
});

export default router;
