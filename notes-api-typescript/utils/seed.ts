import mongoose from "mongoose";
import Note from "../models/note.js";
import User from "../models/user.js";

let user1Notes = [
  {
    content: "HTML is easy",
    important: true,
  },
  {
    content: "Browser can execute only JavaScript",
    important: false,
  },
];

let user2Notes = [
  {
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    content: "REST APIs are stateless",
    important: true,
  },
  {
    content: "Sessions can be stored in MongoDB",
    important: false,
  },
];

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  // Delete any already existing data
  await Note.deleteMany({}).exec();
  await User.deleteMany({}).exec();

  // Create first test user
  const passwordHash1 = await User.hashPassword("password123");
  const user1 = await User.create({
    email: "alice@example.com",
    passwordHash: passwordHash1,
  });

  console.log("Created user:", user1.email);

  // Create second test user
  const passwordHash2 = await User.hashPassword("password456");
  const user2 = await User.create({
    email: "bob@example.com",
    passwordHash: passwordHash2,
  });

  console.log("Created user:", user2.email);

  const passwordHash3 = await User.hashPassword("adminpass");
  const adminUser = await User.create({
    email: "admin@example.com",
    passwordHash: passwordHash3,
    role: "admin",
  });

  console.log("Created admin user:", adminUser.email);

  // Add notes for user 1
  const user1Promises = user1Notes.map((note) => {
    return Note.create({
      content: note.content,
      important: note.important,
      user: user1._id,
    });
  });

  // Add notes for user 2
  const user2Promises = user2Notes.map((note) => {
    return Note.create({
      content: note.content,
      important: note.important,
      user: user2._id,
    });
  });

  // Close connection once all notes have been added
  await Promise.all([...user1Promises, ...user2Promises]);
  console.log(`Created ${user1Notes.length} notes for ${user1.email}`);
  console.log(`Created ${user2Notes.length} notes for ${user2.email}`);
  mongoose.connection.close();
});
