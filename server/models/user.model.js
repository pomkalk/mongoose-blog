var config = require('../lib/config');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserScheme = mongoose.Schema({
    'first_name': String,
    'last_name': String,
    'email': { type: String,  required: true, unique: true, set: (v)=>v.toLowerCase()},
    'password': { type: String, required: true},
    'created_at': { type: Date, default: Date.now() }
});



module.exports = mongoose.model('user', UserScheme);