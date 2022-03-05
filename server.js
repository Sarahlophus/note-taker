const express = require("express");
const path = require("path");
// make these api routes -- front-end needs to do CRUD
const apiRoutes = require("./routes/apiRoutes.js");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// GET Route for notes page
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Wildcard route to direct users to index page
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
