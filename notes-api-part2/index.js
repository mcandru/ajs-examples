import express from "express";
import Note from "./models/Note.js";
import mongoose from "mongoose";
import { HttpError } from "./utils/HttpError.js";

const INTERNAL_SERVER_ERROR = 500;

const app = express();

// Remember, middleware functions are called in the order that they're encountered

// Middleware to parse JSON from request bodies.
app.use(express.json());

app.get("/api/notes", async (_req, res) => {
  const notes = await Note.find({}).exec();
  res.json(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  const note = await Note.findById(req.params.id).exec();

  if (!note) {
    throw new HttpError(404, "Could not find note");
  }

  res.json(note);
});

app.post("/api/notes", async (req, res) => {
  const body = req.body;

  if (!body.content) {
    throw new HttpError(400, "Missing content");
  }

  const { content, important } = body;

  const note = await Note.create({
    content,
    important: important || false,
  });

  res.json(note);
});

app.delete("/api/notes/:id", async (req, res) => {
  const result = await Note.findByIdAndDelete(req.params.id).exec();

  if (!result) {
    throw new HttpError(404, "Could not find note");
  }

  res.status(204).end();
});

// Error handling middleware
// eslint-disable-next-line no-unused-vars
const errorHandler = async (error, _req, res, _next) => {
  console.error("Error:", error.message);

  const { status, message } = error;

  if (!status || !message) {
    return res.status(INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }

  res.status(status).json({ error: message });
};

// Important that this is at the end so that it only handles requests that did not match
// previous routes
const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);
// Important that this is at the end so that it handles errors from all routes
app.use(errorHandler);

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
