var config = require('./lib/config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/../dist"));
console.log(__dirname);
app.listen(5000, ()=>{console.log('Server starten on port *: 5000')});