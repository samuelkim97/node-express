const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
// req => middleware => res

// middleware
// apply to all
// order matters
app.use([logger, authorize]);

app.get("/", (req, res) => {
	res.send("home");
});

app.get("/about", (req, res) => {
	res.send("about");
});
app.get("/api/products", (req, res) => {
	res.send("products");
});
app.get("/api/items", (req, res) => {
	console.log(req.user);
	res.send("items");
});

app.listen(5000, () => {
	console.log("Server is listening on port 5000...");
});
