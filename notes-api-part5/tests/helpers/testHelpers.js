import mongoose from "mongoose";

export const connectToDatabase = async () => {
  // Only connect if not already connected
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      throw error;
    }
  }
};

export const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const closeDatabaseConnectionAndDelete = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error closing MongoDB connection:", error.message);
    throw error;
  }
};
