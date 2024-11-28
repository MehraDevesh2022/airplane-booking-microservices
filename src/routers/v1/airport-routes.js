const express = require("express");
const router= express.Router();
const {AirportController} = require('../../controllers');


router.post("/" , AirportController.create);



module.exports =router;