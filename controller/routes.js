var express = require("express");
var router = express.Router();
const Inventory = require("../models/inventory");
const { Op } = require("sequelize");


router.get("/", function (req, res) {
    Inventory.findAll().then(function(data) {
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
        console.log(hbsObject)
        res.render("index", hbsObject);
    })
})



module.exports = router;