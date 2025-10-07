import express from "express";
import mongoose from "mongoose";
import { errorHandler, unknownEndpoint } from "./utils/middleware.js";
import notesRouter from "./controllers/notes.js";

const app = express();

// Remember, middleware functions are called in the order that they're encountered

// Middleware to parse JSON from request bodies.
app.use(express.json());

app.use("/api/notes", notesRouter);

// Important that this is at the end so that it only handles requests that did not match previous routes
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
