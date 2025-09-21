import express from "express";
import { generateId } from "./utils.js";

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = express();

// Remember, middleware functions are called in the order that they're encountered

// Middleware to parse JSON from request bodies.
app.use(express.json());

app.get("/api/notes", (_req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({
      message: "Could not find note",
    });
  }
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "Missing content",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(notes),
  };

  notes = notes.concat(note);
  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

// Important that this is at the end so that it only handles requests that did not match
// previous routes
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
