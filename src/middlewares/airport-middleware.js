const { AppError, ErrorResponse } = require("../utils")
const { StatusCodes } = require("http-status-codes");
async function airportVaildator(req, res, next) {
          console.log("req" ,req.body);
          
    if (!req.body.name) {
        ErrorResponse.message = "Somthing went wrong while creating aiport."
        ErrorResponse.error = new AppError(["Airport name not present in oncomung request body data."], StatusCodes.BAD_REQUEST);
             return  res.status(StatusCodes.BAD_REQUEST)
                        .json(ErrorResponse);
            }
    else if (!req.body.code) {
        ErrorResponse.message = "Somthing went wrong while creating aiport."
        ErrorResponse.error = new AppError(["Airport code not in present oncomung request body data."], StatusCodes.BAD_REQUEST);
        return  res.status(StatusCodes.BAD_REQUEST)
                   .json(ErrorResponse);
    }
    else if (!req.body.cityID) {
        ErrorResponse.message = "Somthing went wrong while creating aiport."
        ErrorResponse.error = new AppError(["Airport cityID not in present oncomung request body data."], StatusCodes.BAD_REQUEST);
        return  res.status(StatusCodes.BAD_REQUEST)
                   .json(ErrorResponse);
    }
    else if (!req.body.address) {
        ErrorResponse.message = "Somthing went wrong while creating aiport."
        ErrorResponse.error = new AppError(["Airport address not in  present oncomung request body data."], StatusCodes.BAD_REQUEST);
        return  res.status(StatusCodes.BAD_REQUEST)
                   .json(ErrorResponse);
    }else{
        next();
    }

}

module.exports = airportVaildator;