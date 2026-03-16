const express = require("express");
const app = express();

const people = [
	{
		id: 1,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 2,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
	{
		id: 3,
		name: "Arto Hellas ",
		number: "122323213",
	},
];

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/api/people", (request, response) => {
	response.json(people);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
