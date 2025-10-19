import createApp from "../app.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

connectDB();
const app = createApp();

export default app;
