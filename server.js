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
    var newData = req.body;
    console.log(newData);

    let id = 1;

    if (data.length !== 0) {
        id = data[data.length-1].id + 1
    }

    newData.id = id
    data.push(newData)
    //This one not printing to screen yet
    fs.writeFile("./db/db.json", JSON.stringify(data), "utf-8", err =>{
        if (err) return console.log(err)
        // console.log("Droid")
        res.json(newData);
    })
    
    
});



app.delete("/api/notes/:id", function (req, res) {
    var deleted = req.params.id;
    console.log("Deleting")

    for(let i = 0; i < data.length; i++) {

        if(deleted === data[i].id);
        console.log("Before Data:", data)
        data.splice(i, 1);
        console.log("After Data:", data)
    }

    fs.writeFile("./db/db.json", JSON.stringify(data), "utf-8", err =>{
        if (err) return console.log(err)
        // console.log("Droid")
       
        //This one not working yet
        res.json(data);
    })
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

