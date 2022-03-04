//  requirements
const fb = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// show created notes on the side with GET route -- will return array of objects
fb.get("/notes", (req, res) => readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data))));

// create note with POST route
fb.post("/notes", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

// XTRA - delete notes

module.exports = fb;
