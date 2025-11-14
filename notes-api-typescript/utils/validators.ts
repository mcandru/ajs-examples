import mongoose from "mongoose";
import type { Location } from "express-validator";

export const noteSchema = {
  content: {
    in: "body" as Location,
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
    in: "body" as Location,
    optional: true,
    isBoolean: {
      errorMessage: "'important' field must be a boolean value",
    },
  },
};

export const noteIdSchema = {
  id: {
    in: "params" as Location,
    custom: {
      options: (value: unknown) =>
        typeof value === "string" && mongoose.Types.ObjectId.isValid(value),
      errorMessage: "Note ID 'id' parameter must be a valid ObjectId",
    },
  },
};

export const registerSchema = {
  email: {
    in: "body" as Location,
    notEmpty: {
      errorMessage: "'email' field is required",
    },
    isEmail: {
      errorMessage: "'email' field must be a valid email address",
    },
  },
  password: {
    in: "body" as Location,
    notEmpty: {
      errorMessage: "'password' field is required",
    },
    isStrongPassword: {
      options: {
        minLength: 8,
        minSymbols: 0,
        minUpperCase: 1,
        minNumbers: 1,
      },
      errorMessage:
        "'password' field must be 8 characters long, contain at least one upper case character and one number",
    },
  },
};

export const loginSchema = {
  email: {
    in: "body" as Location,
    notEmpty: {
      errorMessage: "'email' field is required",
    },
    isEmail: {
      errorMessage: "'email' field must be a valid email address",
    },
  },
  password: {
    in: "body" as Location,
    notEmpty: {
      errorMessage: "'password' field is required",
    },
    isString: {
      errorMessage: "'password' field must be a valid string",
    },
  },
};
