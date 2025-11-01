import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the User document properties
interface IUser {
  email: string;
  passwordHash: string;
  role: "user" | "admin";
}

// Define instance methods interface
interface IUserMethods {
  verifyPassword(password: string): Promise<boolean>;
}

// Define static methods interface
interface IUserModel extends mongoose.Model<IUser, {}, IUserMethods> {
  hashPassword(password: string): Promise<string>;
}

// Create Schema with proper typing
const userSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>(
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
  transform: (_document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // Never send password hash to client
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

// Static method to hash password
userSchema.statics.hashPassword = async function (password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Instance method to verify password
userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
