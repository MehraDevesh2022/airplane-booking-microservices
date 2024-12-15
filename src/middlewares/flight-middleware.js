const { AppError, ErrorResponse } = require("../utils");
const { StatusCodes } = require("http-status-codes");

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
        ErrorResponse.error = new AppError(["Departure airport id is not present in incoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.arrivalAirportId) {
        ErrorResponse.message = "Something went wrong while creating flight.";
        ErrorResponse.error = new AppError(["Arrival airport id is not present in incoming request body."], StatusCodes.BAD_REQUEST);
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
    } else {
        next();
    }
}

module.exports = {
    validateFlight
};