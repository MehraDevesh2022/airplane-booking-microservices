const express  = require("express");
const router   = express.Router();
const airplaneRoutes  = require("./airplane-router");


router.use("/airplane" , airplaneRoutes);


module.exports = router;