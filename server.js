const express = require("express");
const mongoose = require('mongoose');
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require('body-parser');

var PORT = process.env.PORT || 3030;


//mongoose.connect('mongodb://localhost/my_database');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

require("./routing/htmlRoutes.js")(app);
require("./routing/apiRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });