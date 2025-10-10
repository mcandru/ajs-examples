import express from "express";
import User from "../models/user.js";
import { HttpError, BAD_REQUEST, UNAUTHORIZED } from "../utils/HttpError.js";

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new HttpError(BAD_REQUEST, "Email and password required");
  }

  if (password.length < 6) {
    throw new HttpError(BAD_REQUEST, "Password must be at least 6 characters");
  }

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

  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

// User login
router.post("/login", async (req, res) => {
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
});

// Logout endpoint
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Could not log out" });
    }
    res.clearCookie("sessionId"); // Clear the session cookie
    res.status(200).json({ message: "Logout successful" });
  });
});

// Check authentication status
router.get("/me", async (req, res) => {
  if (req.session && req.session.userId) {
    const { user } = req;
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
