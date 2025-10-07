import { Router } from "express";
import Note from "../models/note.js";
import { HttpError, NOT_FOUND, BAD_REQUEST } from "../utils/HttpError.js";
import { validationResult, matchedData } from "express-validator";
import { createNoteValidator, noteIdValidator } from "../utils/validators.js";

const SUCCESS_NO_CONTENT = 204;

const notesRouter = Router();

notesRouter.get("/", async (_req, res) => {
  const notes = await Note.find({}).exec();
  res.json(notes);
});

notesRouter.get("/:id", noteIdValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(BAD_REQUEST, errors.array()[0].msg);
  }

  const { id } = matchedData(req);

  const note = await Note.findById(id).exec();

  if (!note) {
    throw new HttpError(NOT_FOUND, "Could not find note");
  }

  res.json(note);
});

notesRouter.post("/", createNoteValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(BAD_REQUEST, errors.array()[0].msg);
  }

  const { content, important } = matchedData(req);

  const note = await Note.create({
    content,
    important: important || false,
  });

  res.json(note);
});

notesRouter.delete("/:id", noteIdValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(BAD_REQUEST, errors.array()[0].msg);
  }

  const { id } = matchedData(req);

  const result = await Note.findByIdAndDelete(id).exec();

  if (!result) {
    throw new HttpError(NOT_FOUND, "Could not find note");
  }

  res.status(SUCCESS_NO_CONTENT).end();
});

export default notesRouter;
