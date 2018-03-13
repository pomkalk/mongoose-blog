var fs = require('fs');
var randomstring = require('randomstring');
var args = require('minimist')(process.argv.slice(2), {
    alias: {
        s: "secret"
    }
});

var secret_length = Number.isInteger(args['s']) ? args['s'] : 128;

var config = {
    mongodb: "mongodb://localhost/mongoose-blog",
    secret: randomstring.generate(secret_length)
}

fs.writeFile('./server/config.json', JSON.stringify(config, null, 2), (err)=>{
    if (err)
        return console.error(err.message);
    console.log('Configuration file created in Server folder.');
});