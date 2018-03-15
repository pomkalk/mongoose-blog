var config = require('./lib/config');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./lib/routes');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');


mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb, (err)=>{
    if (err) {
        console.error('Mongodb connection error: Cannot connect to '+config.mongodb);
        process.exit(2);
    }
    console.log('Connected to mongodb: '+config.mongodb);

    app.use(express.static(path.resolve(__dirname+'/../dist')));

    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());
    app.use(expressValidator({
        errorFormatter: (param, msg, value, location) => {
            return msg;
        }
    }));



    app.use(routes);
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname+'/../dist/index.html'));
    });

    app.listen(5000, ()=>{console.log('Server starten on port *: 5000')});
});