import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import User from "./models/user.js";
import Movie from "./models/movie.js";
import { calculateMovieStats } from "./utils/movieStats.js";

const createApp = () => {
  const app = express();
  app.use(express.json());

  // Configure express-session with connect-mongo
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        touchAfter: 24 * 3600, // lazy session update
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    })
  );

  // Authentication middleware
  const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };

  // Authentication endpoints
  app.post("/auth/register", async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password and create user
    const passwordHash = await User.hashPassword(password);
    const newUser = await User.create({
      email,
      name,
      passwordHash,
    });

    // Set session
    req.session.userId = newUser._id.toString();

    res.status(201).json({
      id: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
    });
  });

  app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    // Find user by email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Set session
    req.session.userId = user._id.toString();

    res.json({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });
  });

  app.post("/auth/logout", requireAuth, async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });

  // Movie endpoints (require authentication)
  app.get("/movies/stats", requireAuth, async (req, res) => {
    const userId = req.session.userId;
    const movies = await Movie.find({ userId }).exec();
    const stats = calculateMovieStats(movies);
    res.json(stats);
  });

  app.get("/movies", requireAuth, async (req, res) => {
    const userId = req.session.userId;
    let movies = await Movie.find({ userId }).exec();

    res.json(movies);
  });

  app.post("/movies", requireAuth, async (req, res) => {
    const userId = req.session.userId;

    const { title, year, watched, rating } = req.body;

    if (!title || !year) {
      return res.status(400).json({ error: "Missing movie information" });
    }

    const newMovie = await Movie.create({
      title,
      year,
      watched,
      rating,
      userId,
    });

    res.status(201).json(newMovie);
  });

  const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: "Unknown endpoint" });
  };

  app.use(unknownEndpoint);

  const handleError = (error, _req, res, next) => {
    console.error(error.message);

    res.status(500).json({ error: "Internal Server Error" });

    next(error);
  };

  app.use(handleError);

  return app;
};

export default createApp;
