const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const fs = require("fs");

app.use(express.static("dist"));
app.use(express.json());

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', "index.html"));
});
app.get("/hex", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', "hex.html"));
});
app.post("/save", function (req, res) {
  const data = req.body;
  fs.writeFile('hexagonInfo.json', JSON.stringify(data), function (error) {
    if (error) {
      console.error(error);
      res.status(500).send("Bład podczas zapisu danych");
    } else {
      res.send("Zapisano pomyślnie");
    }
  });
});

app.get("/load", function (req, res) {
  fs.readFile('hexagonInfo.json', 'utf-8', function (error, data) {
    if (error) {
      console.error(error);
      res.status(500).send("Error loading data");
    } else {
      res.json(JSON.parse(data));
    }
  });
});