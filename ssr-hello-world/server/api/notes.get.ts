import { connectToDatabase } from "../utils/db";
import { Note } from "../models/Notes";

export default defineEventHandler(async (event) => {
  await connectToDatabase();

  try {
    const users = await Note.find().sort({ createdAt: -1 }).limit(10);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching users from database",
    });
  }
});
