const { AppError, ErrorResponse } = require("../utils");
const { StatusCodes } = require("http-status-codes");


   async function validateFlight(req, res, next) {
    if (!req.body.flightNumber) {
        ErrorResponse.message = "Somthing went while creating flight.";
        ErrorResponse.error = new AppError(["Flight number is not present in oncoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.airplaneID) {
        ErrorResponse.message = "Somthing went while creating flight.";
        ErrorResponse.error = new AppError(["airplane id is not present in oncoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.departuerAirportID) {
        ErrorResponse.message = "Somthing went while creating flight.";
        ErrorResponse.error = new AppError(["departure airport id is not present in oncoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.arrivelAirportID) {
        ErrorResponse.message = "Somthing went while creating flight.";
        ErrorResponse.error = new AppError(["arrivel airport id is not present in oncoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.arrivalTime) {
        ErrorResponse.message = "Somthing went while creating flight.";
        ErrorResponse.error = new AppError(["arrivel time is not present in oncoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.departureTime) {
        ErrorResponse.message = "Somthing went while creating flight.";
        ErrorResponse.error = new AppError(["departure time is not present in oncoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.price) {
        ErrorResponse.message = "Somthing went while creating flight.";
        ErrorResponse.error = new AppError(["price is not present in oncoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else if (!req.body.totalSeats) {
        ErrorResponse.message = "Somthing went while creating flight.";
        ErrorResponse.error = new AppError(["Toatl seats is not present in oncoming request body."], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    } else {
        next();
    }
}

module.exports ={
    validateFlight
};