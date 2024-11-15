const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers")
const { AirplaneMiddleware } = require("../../middlewares")
// path => api/v1/airplane (post)
router.post("/", AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane);


module.exports = router