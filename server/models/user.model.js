var config = require('../lib/config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserScheme = mongoose.Schema({
    'first_name': String,
    'last_name': String,
    'email': { type: String,  required: true, unique: true, set: (v)=> v.toLowerCase(), validate: {
        validator: (v) => {
            return /\S+?@\S+\.\S+/.test(v);
        },
        message: 'Not valie email address'
    }},
    'password': { type: String, required: true, set: (v)=>{
        return bcrypt.hashSync(v, 10);
    }},
    'created_at': { type: Date, default: Date.now() }
});



module.exports = mongoose.model('user', UserScheme);