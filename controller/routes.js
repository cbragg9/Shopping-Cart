var express = require("express");
var router = express.Router();
const Inventory = require("../models/inventory");
const { Op } = require("sequelize");


router.get("/", function (req, res) {
    Inventory.findAll().then(function(data) {
        console.log(data);
        res.render("index");
    })
})



module.exports = router;