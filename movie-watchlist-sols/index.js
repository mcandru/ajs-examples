import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";
import Movie from "./models/movie.js";

const app = express();
app.use(express.json());

app.get("/users", async (_req, res) => {
  const users = await User.find({}).exec();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Missing user information" });
  }

  const newUser = await User.create({
    email,
    name,
  });

  res.status(201).json(newUser);
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.get("/users/:id/movies", async (req, res) => {
  const userId = req.params.id;
  const movies = await Movie.find({ userId }).exec();
  res.json(movies);
});

app.post("/users/:id/movies", async (req, res) => {
  const userId = req.params.id;
  const { title, year, watched, rating } = req.body;

  if (!title || !year) {
    return res.status(400).json({ error: "Missing movie information" });
  }

  const user = await User.findById(userId).exec();
  if (!user) {
    return res.status(404).json({ error: "User not found" });
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

app.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await app.connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer();
