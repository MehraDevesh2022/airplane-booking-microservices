const { AppError, ErrorResponse } = require("../utils")
const { StatusCodes } = require("http-status-codes");


const sendErrorResponse = (res, message, detail) => {

    ErrorResponse.message = message;
    ErrorResponse.error = new AppError([detail], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);

}


async function airportValidator(req, res, next) {

    const errorMessages = "Something went wrong while creating airport."

    const validators = [
        { condition: !req.body.name, detail: "Airport name not present in oncoming request body data." },
        { condition: !req.body.code, detail: "Airport code not present in oncoming request body data." },
        { condition: !req.body.cityId, detail: "Airport cityId not present in oncoming request body data." },
        { condition: !req.body.address, detail: "Airport address not present in oncoming request body data." }

    ]


    for (const validator of validators) {
        if (validator.condition) {
            return sendErrorResponse(res, errorMessages, validator.detail);
        }

    }

    next();

    }

    module.exports = airportValidator;