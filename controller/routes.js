var express = require("express");
var router = express.Router();
const Inventory = require("../models/inventory");
const defineProductArray = require("../lib/product");

router.get("/shop", function (req, res) {
    Inventory.findAll().then(function(data) {
        // SQL object needed to be reformatted into an array for handlebars to work
        const hbsObject = defineProductArray(data, "render");

        res.render("index", hbsObject);
    })
})

router.get("/", function (req, res) {
    res.render("landing");
})

router.get("/api/products", function (req, res) {
    Inventory.findAll().then(function(data) {
        var productArray = defineProductArray(data, "api");
        res.json(productArray);
    });
})

router.put("/api/checkout", function(req, res) {
    let cart = req.body.id;
    for (let i = 0; i < cart.length; i++) {
        console.log(cart[i].cartQuantity);
        let updatedStock = cart[i].stock - cart[i].cartQuantity;
        console.log(updatedStock);
        Inventory.update({stock: updatedStock}, {
            where: {
                id: cart[i].id
            }
        }).then(function (result) {
            if (result.changedRows == 0) {
                res.status(404).end();
            } else {
                console.log("Success");
                res.status(200).end();
            }
        })
    }
})

module.exports = router;