// Dependencies
var Sequelize = require("sequelize");
require("dotenv").config();

// Creates mySQL connection using Sequelize
var sequelize = new Sequelize("eyekeyuh", process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


// Exports the connection for other files to use
module.exports = sequelize;
