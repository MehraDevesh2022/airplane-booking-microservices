const { AppError, ErrorResponse, CompareDates } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { compareDates } = CompareDates;

async function validateFlight(req, res, next) {
    if (!req.body.flightNumber) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Flight number is not present in incoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.airplaneId) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Airplane id is not present in incoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.departureAirportId) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Departure airport code is not present in incoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.arrivalAirportId) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Arrival airport code is not present in incoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.arrivalTime) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Arrival time is not present in incoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.departureTime) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Departure time is not present in incoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.price) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Price is not present in incoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.totalSeats) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Total seats is not present in incoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!compareDates(req.body.departureTime, req.body.arrivalTime)) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Arrival Time should be greater than departure time while creating flight."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    else {
        next();
    }
}



async function validateFlightSeats(req, res, next) {

    if (!req.body.totalSeats) {
        ErrorResponse.message = "Somthing went wrong while creating flight."
        ErrorResponse.error = new AppError(["Seats is not present in incomming request body."], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateFlight,
    validateFlightSeats
};