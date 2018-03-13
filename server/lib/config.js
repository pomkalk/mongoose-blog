var fs = require('fs');
if (!fs.existsSync('./server/config.json')) {
    console.error('Configurations file (config.json) not founded.\nType "npm run create-config" to generate configuration file and try again.');
    process.exit(1);
}
module.exports = JSON.parse(fs.readFileSync('./server/config.json'));

