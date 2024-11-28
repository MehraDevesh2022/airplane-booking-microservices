const express  = require("express");
const router   = express.Router();
const airplaneRoutes  = require("./airplane-router");
const cityRoutes = require("./city-router");
const airportRoutes = require("./airport-routes");
router.use("/airplane" , airplaneRoutes);
router.use("/city" , cityRoutes);
router.use("/airport" , airplaneRoutes)
module.exports = router;