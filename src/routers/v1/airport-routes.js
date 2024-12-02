const express = require("express");
const router= express.Router();
const {AirportController} = require('../../controllers');
const {AirportMiddleware}  = require("../../middlewares");

router.post("/" ,AirportMiddleware ,  AirportController.createAirport);
router.get("/:id" , AirportController.getAiport);
router.get("/" , AirportController.getAiports);
router.patch("/:id" ,AirportMiddleware , AirportController.updateAirport);
router.delete("/:id" , AirportController.destoryAirport);



module.exports =router;