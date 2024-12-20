const express = require("express");
const router = express.Router();
const { FlightMiddleware } = require("../../middlewares")
const { FligthController } = require("../../controllers")

/**
 * route : api/v1/flight
 * method : post
 * logic : create
 */

router.post("/", FlightMiddleware.validateFlight
              , FligthController.createFlight
);


/**
 * route : api/v1/flight/:id
 * method : get
 * logic : get flight by id
 */

router.get("/:id",  FligthController.getflight);

/**
 * route : api/v1/flight
 * method : get
 * logic : get all flight
 */

router.get("/", FligthController.getFlights);


/**
 * route : api/v1/flight
 * method : patch
 * logic : update flight 
 */

router.patch("/:id", FlightMiddleware.validateFlight ,
                    FligthController.updateflight);


/**
 * route : api/v1/flight/:id
 * method : delete
 * logic : delete flight by id
 */

router.delete("/:id",  FligthController.destoryflight);


module.exports = router;