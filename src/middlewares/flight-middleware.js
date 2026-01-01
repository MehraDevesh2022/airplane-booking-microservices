const { AppError, ErrorResponse, CompareDates } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { compareDates } = CompareDates;


const sendErrorResponse = (res, message, detail) => {

    ErrorResponse.message = message;
    ErrorResponse.error = new AppError([detail], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
}






function validateFlight(req, res, next) {

    const errorMessages = "Something went wrong while creating flight.";

    const validators = [
        { condition: !req.body.flightNumber, detail: "Flight number is not present in incoming request body." },
        { condition: !req.body.airplaneId, detail: "Airplane id is not present in incoming request body." },
        { condition: !req.body.departureAirportId, detail: "Departure airport code is not present in incoming request body." },
        { condition: !req.body.arrivalAirportId, detail: "Arrival airport code is not present in incoming request body." },
        { condition: !req.body.arrivalTime, detail: "Arrival time is not present in incoming request body." },
        { condition: !req.body.departureTime, detail: "Departure time is not present in incoming request body." },
        { condition: !req.body.price, detail: "Price is not present in incoming request body." },
        { condition: !req.body.totalSeats, detail: "Total seats is not present in incoming request body." },
        { condition: !compareDates(req.body.departureTime, req.body.arrivalTime), detail: "Arrival Time should be greater than departure time while creating flight." }
    ];

    for (const validator of validators) {
        if (validator.condition) {
            return sendErrorResponse(res, errorMessages, validator.detail);
        }
    }
    next();
}



async function validateFlightSeats(req, res, next) {

    if (!req.body.totalSeats) {
        ErrorResponse.message = "Something went wrong while creating flight."
        ErrorResponse.error = new AppError(["Seats is not present in incoming request body."], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateFlight,
    validateFlightSeats
};