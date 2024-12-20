
const { log } = require("winston");
const { FlightService } = require("../services")
const { ErrorResponse, SuccessResponse } = require("../utils");
const StatusCodes = require("http-status-codes")

/**
 * POST : api/v1/flight
 * req.body : {
 *  flightNumber: 'AI123',
 *  airplaneId: 1,
 *  departureAirportId: 1,
 *  arrivalAirportId: 2,
 *  arrivalTime: '2024-01-01T10:00:00Z',
 *  departureTime: '2024-01-01T08:00:00Z',
 *  price: 5000,
 *  boardingGate: 'A1',
 *  totalSeats: 120
 * }
 */

async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: parseInt(req.body.airplaneId),
            departureAirportId: parseInt(req.body.departureAirportId),
            arrivalAirportId: parseInt(req.body.arrivalAirportId),
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: parseInt(req.body.price),
            boardingGate: req.body.boardingGate,
            totalSeats: parseInt(req.body.totalSeats)
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

        
        const flights = await FlightService.getFlights(req.query);
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
 * PATCH : api/v1/flights/:id
 * req.body : {
 *  flightNumber?: 'AI123',
 *  airplaneId?: 1,
 *  departureAirportId?: 1,
 *  arrivalAirportId?: 2,
 *  arrivalTime?: '2024-01-01T10:00:00Z',
 *  departureTime?: '2024-01-01T08:00:00Z',
 *  price?: 5000,
 *  boardingGate?: 'A1',
 *  totalSeats?: 120
 * }
 */


async function updateflight(req, res) {
    try {
        const flight = await FlightService.updateFlight(req.params.id, req.body);
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



module.exports = {
    createFlight,
    updateflight,
    getFlights,
    getflight,
    destoryflight
}