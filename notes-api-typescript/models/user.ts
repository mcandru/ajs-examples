import mongoose from "mongoose";
import bcrypt from "bcrypt";
import type { Model, InferSchemaType } from "mongoose";

interface SerialisedUser {
  id: string;
  email: string;
  role: "user" | "admin";
}

// Create Schema with proper typing
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Transform output to remove sensitive data
userSchema.set("toJSON", {
  transform: (_document, returnedObject): SerialisedUser => {
    return {
      id: returnedObject._id.toString(),
      email: returnedObject.email,
      role: returnedObject.role,
    };
  },
});

// Defines the fields available on User documents
type UserFields = InferSchemaType<typeof userSchema>;

// Defines the instance methods for User documents
interface UserMethods {
  verifyPassword(password: string): Promise<boolean>;
}

// Defines the type for the User model with type definitions for static methods
// Extends Model<TFields, TQueryHelpers, TMethods> from Mongoose
interface UserModel extends Model<UserFields, {}, UserMethods> {
  hashPassword(password: string): Promise<string>;
}

// Combines fields and methods into a single type to define an instance of a User
export type UserDocument = UserFields & UserMethods;

// Static method to hash password
userSchema.statics.hashPassword = async function (password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Instance method to verify password
userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
