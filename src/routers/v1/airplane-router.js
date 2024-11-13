const express  = require("express");
const router  = express.Router();
const {AirplaneController} = require("../../controllers")
 
// path => api/v1/airplane (post)
router.post("/" , AirplaneController.createAirplane);


module.exports =router