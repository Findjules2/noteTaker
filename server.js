var express = require("express");
var path = require("path");
const fs = require("fs");
const data = require("./db/db.json");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Basic route that sends the user first to the AJAX Page

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function (req, res) {
    console.log("HelloMoto")
    res.json(data);
});

app.post("/api/notes", function (req, res) {
    //This one not working yet
    console.log("Droid")
    res.json(data);
});

app.delete("/api/notes", function (req, res) {
    //This one not working yet
    console.log("Deleting")
    res.json(data);
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

