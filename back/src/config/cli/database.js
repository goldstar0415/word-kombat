const path = require("path");
const envPath = path.resolve(".env");

require("dotenv").config({ path: envPath });

module.exports = {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    operatorsAliases: false,
    define: {
        timestamps: true
    }
};
