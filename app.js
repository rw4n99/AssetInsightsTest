const express = require('express');
const exphbs = require('express-handlebars'); //Rendering engine
const bodyParser = require('body-parser'); //Middleware
const mysql = require('mysql'); //Database

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse to json data
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});