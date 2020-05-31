var express = require("express");
var router = express.Router();
const Inventory = require("../models/inventory");
const { Op } = require("sequelize");


router.get("/shop", function (req, res) {
    Inventory.findAll().then(function(data) {

        // SQL object needed to be reformatted into an array for handlebars to work
        let dataArray = [];

        for (var i = 0; i < data.length; i++) {
            let productEntry = {
                id: data[i].ID,
                name: data[i].name,
                price: data[i].price,
                stock: data[i].stock,
                image: data[i].image
            }
            dataArray.push(productEntry);
        }

        let hbsObject = {
            product: dataArray
        };

        res.render("index", hbsObject);
    })
})

router.get("/", function (req, res) {
    res.render("landing");
})



module.exports = router;