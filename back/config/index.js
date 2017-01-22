const nconf = require('nconf');
const path = require('path');
const fs = require('fs');

nconf.argv().env().file({
  file: path.join(__dirname, "configuration.json")
});

nconf.set('port', process.env.NODE_PORT || 8080);
nconf.set('host', process.env.NODE_IP || "127.0.0.1")

module.exports = nconf;