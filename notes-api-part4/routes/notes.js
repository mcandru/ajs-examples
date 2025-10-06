import { Router } from "express";
import { validate } from "../utils/middleware.js";
import { createNoteSchema, noteIdSchema } from "../utils/validators.js";
import { requireAuth } from "../utils/session.js";
import Note from "../models/note.js";
import { HttpError, NOT_FOUND } from "../utils/HttpError.js";

const SUCCESS_NO_CONTENT = 204;

const notesRouter = Router();

// Protect all routes in this router
notesRouter.use(requireAuth);

notesRouter.get("/", async (req, res) => {
  // Only return notes for the logged-in user
  const notes = await Note.find({ user: req.session.userId }).exec();
  res.json(notes);
});

notesRouter.get("/:id", validate(noteIdSchema), async (req, res) => {
  // Only return note if it belongs to the logged-in user
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.session.userId,
  }).exec();

  if (!note) {
    throw new HttpError(NOT_FOUND, "Could not find note");
  }

  res.json(note);
});

notesRouter.post("/", validate(createNoteSchema), async (req, res) => {
  const body = req.body;

  const { content, important } = body;

  // Associate note with the logged-in user
  const note = await Note.create({
    content,
    important: important || false,
    user: req.session.userId,
  });

  res.json(note);
});

notesRouter.delete("/:id", validate(noteIdSchema), async (req, res) => {
  // Only delete note if it belongs to the logged-in user
  const result = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.session.userId,
  }).exec();

  if (!result) {
    throw new HttpError(NOT_FOUND, "Could not find note");
  }

  res.status(SUCCESS_NO_CONTENT).end();
});

export default notesRouter;
