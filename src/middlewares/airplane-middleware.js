const StatusCodes = require("http-status-codes")

function validateCreateRequest(rq , res , next) {
    if(!req.body.modelNumber){
         return res.status(StatusCodes.BAD_REQUEST).json({
            sucsess : false,
            message : "Sonthing went wrong while creating airplane.",
            data : {},
            error : {explanation : "model number not found."}
         })
    }

    next();

}



module.exports ={
validateCreateRequest
}
                                               





