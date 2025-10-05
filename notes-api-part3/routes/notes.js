import { Router } from "express";
import { validate } from "../utils/middleware.js";
import { createNoteSchema, noteIdSchema } from "../utils/validators.js";
import Note from "../models/note.js";
import { HttpError, NOT_FOUND } from "../utils/HttpError.js";

const SUCCESS_NO_CONTENT = 204;

const notesRouter = Router();

notesRouter.get("/", async (_req, res) => {
  const notes = await Note.find({}).exec();
  res.json(notes);
});

notesRouter.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id).exec();

  if (!note) {
    throw new HttpError(NOT_FOUND, "Could not find note");
  }

  res.json(note);
});

notesRouter.post("/", async (req, res) => {
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

notesRouter.delete("/:id", async (req, res) => {
  const result = await Note.findByIdAndDelete(req.params.id).exec();

  if (!result) {
    throw new HttpError(NOT_FOUND, "Could not find note");
  }

  res.status(SUCCESS_NO_CONTENT).end();
});

export default notesRouter;
