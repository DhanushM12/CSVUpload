//fetch the existing instance
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("router loaded");

router.get("/", homeController.home);

//for any other routes, access from here
//router.use('/routerName', require('./routerFile'));
router.use("/csv", require("./csv"));

module.exports = router;
