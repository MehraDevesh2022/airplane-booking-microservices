
const { ErrorResponse, AppError } = require("../utils");
const StatusCodes = require("http-status-codes")
function vaildateCityInputs(req, res, next) {

 


    if (!req.body.name) {
        
        ErrorResponse.message = "Somthing wen wrong while creating City.";
        ErrorResponse.error = new AppError(["City name not found in the oncoming request in the correct form."], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json({ ErrorResponse });
    }

    next();
}


module.exports = {
    vaildateCityInputs
}