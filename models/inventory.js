// Require the sequelize library
var Sequelize = require("sequelize");

// Require the connection to the database (connection.js)
var sequelizeConnection = require("../config/connection.js");

var Inventory = sequelizeConnection.define("inventory", {
    ID: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: Sequelize.STRING,
    price: Sequelize.FLOAT,
    stock: Sequelize.INTEGER,
    image: Sequelize.STRING
});

Inventory.sync();

// Seeds
// Inventory.create({
//     name: "Black Chair",
//     price: 39.99,
//     stock: 15,
//     image: "assets/img/chair.jpg"
// }),

// Inventory.create({
//     name: "Modern Queen",
//     price: 199.99,
//     stock: 5,
//     image: "assets/img/modern_bed.jpg"
// }),

// Inventory.create({
//     name: "Green Sofa",
//     price: 129.99,
//     stock: 10,
//     image: "assets/img/couch.jpg"
// }),

// Inventory.create({
//     name: "Dining Table",
//     price: 89.99,
//     stock: 8,
//     image: "assets/img/dining_table.jpg"
// }),

// Inventory.create({
//     name: "Dresser",
//     price: 149.99,
//     stock: 6,
//     image: "assets/img/dresser.jpg"
// }),

// Inventory.create({
//     name: "Patio Sofa",
//     price: 109.99,
//     stock: 4,
//     image: "assets/img/outdoor_sofa.jpg"
// }),

// Inventory.create({
//     name: "Wardrobe",
//     price: 139.99,
//     stock: 8,
//     image: "assets/img/wardrobe.jpg"
// }),

// Inventory.create({
//     name: "Computer Desk",
//     price: 99.99,
//     stock: 6,
//     image: "assets/img/computer_desk.jpg"
// })


module.exports = Inventory;