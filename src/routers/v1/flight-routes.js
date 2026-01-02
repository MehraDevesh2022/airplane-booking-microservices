const express = require("express");
const router = express.Router();
const { FlightMiddleware } = require("../../middlewares")
const { FlightController } = require("../../controllers")

/**
 * route : api/v1/flight
 * method : post
 * logic : create
 */

router.post("/", FlightMiddleware.validateFlight
    , FlightController.createFlight
);


/**
 * route : api/v1/flight/:id
 * method : get
 * logic : get flight by id
 */

router.get("/:id", FlightController.getFlight);

/**
 * route : api/v1/flight
 * method : get
 * logic : get all flight
 */

router.get("/", FlightController.getFlights);


/**
 * route : api/v1/flight/:id/seats
 * method : patch
 * logic : update flight 
 */

router.patch("/:id/seats", FlightMiddleware.validateFlightSeats,
    FlightController.updateFlightSeats);


/**
 * route : api/v1/flight/:id
 * method : delete
 * logic : delete flight by id
 */

router.delete("/:id", FlightController.destroyFlight);


module.exports = router;