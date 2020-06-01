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

module.exports = router;