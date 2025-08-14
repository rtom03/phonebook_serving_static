const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const options = ":method :url :status :response-time ms - :res[content-length]";
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(cors());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/persons", (req, res) => {
  return res.json(persons);
});

app.get("/info", (req, res) => {
  const now = new Date();

  res.json({
    data: `Phonebook has ${persons.length} entries`,
    year: now.getFullYear(),
    month: now.getMonth() + 1, // Months are 0-based in JS
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    formatted: now.toLocaleString(), // nice readable format
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const getPerson = persons.find((name) => name.id === id);
  return res.json(getPerson);
});

app.delete("/api/person/:id", (req, res) => {
  const id = req.params.id;
  const getPerson = persons.find((name) => name.id === id);
  persons = persons.filter((person) => person.id !== getPerson.id);
  console.log(persons);
  return res.json({ message: `Deleted ${getPerson.name}`, data: persons });
});

const getRandom = () => {
  const ids =
    persons.length > 0
      ? Math.random(...persons.map((person) => Number(person.id)))
      : 0;
  return ids;
};

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!req.body) {
    return res.status(400).json({ message: "Name and number are required" });
  } else {
    const newObj = {
      name,
      number,
      id: getRandom(),
    };
    return res.json(persons.concat(newObj));
  }
});

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON http://localhost:${PORT}`);
});
