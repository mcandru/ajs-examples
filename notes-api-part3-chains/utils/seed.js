import mongoose from "mongoose";
import Note from "../models/note.js";

let notes = [
  {
    content: "HTML is easy",
    important: true,
  },
  {
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  // Delete any already existing data
  await Note.deleteMany({}).exec();

  // Add new notes
  const promises = notes.map((note) => {
    return Note.create({
      content: note.content,
      important: note.important,
    });
  });

  // Close connection once new notes have been added
  await Promise.all(promises);
  mongoose.connection.close();
});
