import mongoose from "mongoose";
import User from "./models/user.js";
import Movie from "./models/movie.js";

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Movie.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const user1 = await User.create({
      email: "alice@example.com",
      name: "Alice Johnson",
    });

    const user2 = await User.create({
      email: "bob@example.com",
      name: "Bob Smith",
    });

    console.log("Created users");

    // Create movies for Alice
    await Movie.create([
      {
        title: "The Shawshank Redemption",
        year: 1994,
        watched: true,
        rating: 9.5,
        userId: user1._id,
      },
      {
        title: "Inception",
        year: 2010,
        watched: true,
        rating: 8.8,
        userId: user1._id,
      },
      {
        title: "The Matrix",
        year: 1999,
        watched: false,
        userId: user1._id,
      },
    ]);

    // Create movies for Bob
    await Movie.create([
      {
        title: "Pulp Fiction",
        year: 1994,
        watched: true,
        rating: 9.0,
        userId: user2._id,
      },
      {
        title: "The Dark Knight",
        year: 2008,
        watched: true,
        rating: 9.2,
        userId: user2._id,
      },
      {
        title: "Interstellar",
        year: 2014,
        watched: false,
        userId: user2._id,
      },
    ]);

    console.log("Created movies");
    console.log("\nSeed data added successfully!");
    console.log(`User 1 ID: ${user1._id}`);
    console.log(`User 2 ID: ${user2._id}`);

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
