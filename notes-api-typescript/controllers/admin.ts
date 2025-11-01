import { Router } from "express";
import { User } from "../models/user.js";
import { Note } from "../models/note.js";
import type { Request, Response } from "express";

const adminRouter = Router();

// Get all users
adminRouter.get(
  "/users",
  async (_req: Request, res: Response): Promise<void> => {
    const users = await User.find().exec();
    res.json(users);
  }
);

// Get all notes (across all users)
adminRouter.get(
  "/notes",
  async (_req: Request, res: Response): Promise<void> => {
    // Populates only the email and role fields
    const notes = await Note.find().populate("user", "email role").exec();
    res.json(notes);
  }
);

export default adminRouter;
