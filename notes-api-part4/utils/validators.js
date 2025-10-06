import mongoose from "mongoose";

export const createNoteSchema = {
  content: {
    in: ["body"],
    notEmpty: {
      errorMessage: "'content' field is required",
    },
    isString: {
      errorMessage: "'content' field value must be a string",
    },
    isLength: {
      options: { min: 5, max: 1000 },
      errorMessage:
        "'content' field value must be between 5 and 1000 characters",
    },
    trim: true,
  },
  important: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "'important' field must be a boolean value",
    },
  },
};

export const noteIdSchema = {
  id: {
    in: ["params"],
    custom: {
      options: (value) => mongoose.Types.ObjectId.isValid(value),
      errorMessage: "Note ID 'id' parameter must be a valid ObjectId",
    },
  },
};
