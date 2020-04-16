/** @format */

const express = require("express");
const ConnectDB = require("./config/db");

const debug = require("debug")("server");

// NEW - bring in the cors library
const cors = require("cors");
const app = express();

//connect mongo db
ConnectDB();

//init middleware
app.use(express.json({ extended: false }));

// NEW - replace custom middleware with the cors() middleware
app.use(cors());

//send the  for default url
app.all("/*", function (req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	// Set custom headers for CORS
	res.header(
		"Access-Control-Allow-Headers",
		"Content-type,Accept,X-Access-Token,X-Key"
	);
	if (req.method == "OPTIONS") {
		res.status(200).end();
	} else {
		next();
	}
});

app.get("/", (req, res) => {
	//res.send('Wel come stating API');
	res.json({ msg: "Wel Come to API" });
});

const usercontroller = require("./routes/users");
const contactController = require("./routes/contacts");
app.use("/api/users", usercontroller);

app.use("/api/contacts", contactController);
app.use("/api/auth", require("./routes/auth"));

const port = process.env.PORT || 5000;

app.listen(port, () => debug(`Listening on port ${port}`));
