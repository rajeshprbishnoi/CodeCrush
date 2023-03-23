// express for creating the app
const express = require("express");
// body-parser for parsing request bodies
const bodyParser = require("body-parser");
// cors for handling cross-origin requests
const cors = require("cors");
// helmet for setting various HTTP headers for security
const helmet = require("helmet");
// morgan for logging HTTP requests and responses
const morgan = require("morgan");
// contains the individual routes for handling HTTP requests
const routes = require("./routes");

const { db } = require("./db/model.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// setup routes
app.use("/api/auth", authRoute);
app.use("/api/files/:id", filesRoute);
app.use("/api/collaborate/:id", collabRoute);

// Set up error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

app.get("/", (req, res) => {
	res.send("Hello there!");
});

const PORT = process.env.PORT || 3000;
db.sync()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT} ...`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
