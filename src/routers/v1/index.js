const express  = require("express");
const router   = express.Router();
const airplaneRoutes  = require("./airplane-router");
const cityRoutes = require("./city-router");

router.use("/airplane" , airplaneRoutes);
router.use("/city" , cityRoutes);

module.exports = router;