const express = require("express");
const app = express();
const morgan = require("morgan");

let people = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (request, response) => {
	response.send("<h1>Wellcome to the phonebook</h1>");
});

app.get("/info", (request, response) => {
	const nPeople = people.length;
	const date = Date();
	response.send(
		`<p>Phonebook has info for ${nPeople} people</p> <p>${date}</p>`,
	);
});

app.get("/api/people/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = people.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.get("/api/people", (request, response) => {
	response.json(people);
});

app.delete("/api/people/:id", (request, response) => {
	const id = Number(request.params.id);
	people = people.filter((person) => person.id !== id);
	response.status(204).end();
});

app.post("/api/people", (request, response) => {
	const body = request.body;

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "information missing",
		});
	}
	if (people.find((p) => p.name === body.name)) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}
	const id = Math.floor(Math.random() * 1000000);
	const person = {
		id: id,
		name: body.name,
		number: body.number,
	};
	people = people.concat(person);

	response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
