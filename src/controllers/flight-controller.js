
const { FlightService} = require("../services")
const { ErrorResponse, SuccessResponse } = require("../utils");
const StatusCodes = require("http-status-codes")

/**
 * post : api/v1/flight
 * req.body : {name : "string"} 
 */

async function createFlight(req, res) {
    try {
      const flight = await FlightService.createFlight({
        flightNumber: req.body.flightNumber,
        airplaneID: req.body.airplaneID,
        departuerAirportID: req.body.departuerAirportID,
        arrivelAirportID: req.body.arrivelAirportID,
        arrivalTime: req.body.arrivalTime,
        departureTime: req.body.departureTime,
        price: req.body.price,
        boardingGate: req.body.boardingGate,
        totalSeats: req.body.totalSeats
      });
        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
         ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}


/**
 * get : api/v1/flight/:id
 * req.body : {}
 */

async function getflight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * get : api/v1/flight
 * req.body : {}
 */

async function getFlights(req, res) {
    try {
     
        
        const flights = await FlightService.getFlights();
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        
        return res.status(error.statusCode)
                .json(ErrorResponse);
    }
}


/**
 * delete : api/v1/flight/:id
 * req.body  : {}
 */

async function destoryflight(req, res) {
    try {
       
        
        const flight = await FlightService.destoryFlight(req.params.id);
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK) 
                  .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
                  .json(ErrorResponse);
    }
}


/**
 * patch : api/v1/flight/:id
 * req.body : {}
 */


async function updateflight(req, res) {
    try {
        const flight = await FlightService.updateFlight(req.params.id , req.body);
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK)
                 .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        
        ErrorResponse.error = error;
        return res.status(error.statusCode)
                  .json(ErrorResponse);
    }
}



module.exports  = {
    createFlight,
    updateflight,
    getFlights,
    getflight,
    destoryflight
}