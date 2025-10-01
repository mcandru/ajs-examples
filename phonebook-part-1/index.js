import express from "express";
import { generateId } from "./utils.js";

const app = express();
app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Michael McAndrew",
    phone_number: "012-3928374",
  },
  {
    id: "2",
    name: "John Appleseed",
    phone_number: "028-20483729",
  },
  {
    id: "3",
    name: "Jane Doe",
    phone_number: "938-2938473",
  },
  {
    id: "4",
    name: "John Smith",
    phone_number: "282-29382372",
  },
];

app.get("/api/persons", (_req, res) => {
  res.json(persons);
});

app.get("/api/info", (_req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({
      error: "Person not found",
    });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  if (!body.phone_number) {
    return res.status(400).json({
      error: "phone_number missing",
    });
  }

  const existingPerson = persons.find((person) => person.name === body.name);
  if (existingPerson) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(persons),
    name: body.name,
    phone_number: body.phone_number,
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
