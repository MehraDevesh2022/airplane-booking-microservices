const express = require("express");
const router= express.Router();
const {AirportController} = require('../../controllers');
const {AirportMiddleware}  = require("../../middlewares");

router.post("/" ,AirportMiddleware ,  AirportController.createAirport);
router.get("/:id" , AirportController.getAirport);
router.get("/" , AirportController.getAirports);
router.patch("/:id" ,AirportMiddleware , AirportController.updateAirport);
router.delete("/:id" , AirportController.destroyAirport);



module.exports =router;