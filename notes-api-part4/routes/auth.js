import express from "express";
import User from "../models/user.js";

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ error: "Username or email already exists" });
  }

  // Hash password and create user
  const passwordHash = await User.hashPassword(password);
  const user = await User.create({
    username,
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
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  // Find user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Verify password
  const passwordCorrect = await user.verifyPassword(password);
  if (!passwordCorrect) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Set session
  req.session.userId = user._id.toString();
  req.session.username = user.username;

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
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ message: "Logout successful" });
  });
});

// Check authentication status
router.get("/me", async (req, res) => {
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
