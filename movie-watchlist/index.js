import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.get("/users", async (_req, res) => {
  // TODO: Replace with actual database query

  // Sample data for now
  const users = [
    { id: "1", email: "alice@example.com", name: "Alice Johnson" },
    { id: "2", email: "bob@example.com", name: "Bob Smith" },
  ];

  res.json(users);
});

app.post("/users", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Missing user information" });
  }

  // TODO: Replace with actual database insertion

  // Sample response for now
  const newUser = { id: "3", email, name };

  res.status(201).json(newUser);
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  // TODO: Replace with actual database query

  // Sample data for now
  const user = {
    id: userId,
    email: "alice@example.com",
    name: "Alice Johnson",
  };

  // TODO: Handle case when user is not found
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.get("/users/:id/movies", async (req, res) => {
  const userId = req.params.id;

  // TODO: Replace with actual database query

  // Sample data for now
  const movies = [
    {
      id: "1",
      title: "The Shawshank Redemption",
      year: 1994,
      watched: true,
      rating: 9.5,
    },
    { id: "2", title: "Inception", year: 2010, watched: true, rating: 8.8 },
    { id: "3", title: "The Matrix", year: 1999, watched: false },
  ];

  res.json(movies);
});

app.post("/users/:id/movies", async (req, res) => {
  const userId = req.params.id;
  const { title, year, watched, rating } = req.body;

  // TODO: Add validation
  if (!title || !year) {
    return res.status(400).json({ error: "Missing movie information" });
  }

  // TODO: Verify user exists before adding movie
  // TODO: Replace with actual database insertion

  // Sample response for now
  const newMovie = { id: "4", title, year, watched, rating };

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
