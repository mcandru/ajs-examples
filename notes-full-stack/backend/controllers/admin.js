import { Router } from "express";
import User from "../models/user.js";
import Note from "../models/note.js";

const adminRouter = Router();

// Get all users
adminRouter.get("/users", async (_req, res) => {
  const users = await User.find().exec();
  res.json(users);
});

// Get all notes (across all users)
adminRouter.get("/notes", async (_req, res) => {
  // Populates only the email and role fields
  const notes = await Note.find().populate("user", "email role").exec();
  res.json(notes);
});

export default adminRouter;
