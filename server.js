const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/submit", (req, res) => {
	const { code, language } = req.body;
	// Handle code submission here
});

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
