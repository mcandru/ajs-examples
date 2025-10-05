import mongoose from "mongoose";
import { body, param } from "express-validator";

export const createNoteValidator = [
  body("content")
    .notEmpty()
    .withMessage("'content' field is required")
    .isString()
    .withMessage("'content' field value must be a string")
    .isLength({ min: 5, max: 1000 })
    .withMessage("'content' field value must be between 5 and 1000 characters")
    .trim(), // Santise input by trimming whitespace
  body("important")
    .optional()
    .isBoolean()
    .withMessage("'important' field must be a boolean value"),
];

export const noteIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("'id' parameter is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("'id' parameter must be a valid ID"),
];
