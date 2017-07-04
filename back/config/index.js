const nconf = require('nconf');
const path = require('path');
const fs = require('fs');

nconf.argv().env().file({
  file: path.join(__dirname, "configuration.json")
});

nconf.set('cloudinary:api_key', process.env.CLOUDINARY_API_KEY);
nconf.set('cloudinary:api_secret', process.env.CLOUDINARY_API_SECRET);
nconf.set('database:host', process.env.OPENSHIFT_POSTGRESQL_DB_HOST || 'localhost');
nconf.set('port', process.env.NODE_PORT || 8080);
nconf.set('host', process.env.OPENSHIFT_DIY_IP || "0.0.0.0");

module.exports = nconf;
