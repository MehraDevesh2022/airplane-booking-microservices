const {AirportServices} = require("../services");
const {ErrorResponse ,SuccessResponse} = require("../utils");
const {StatusCodes} = require("http-status-codes");



/**
 * method : post
 * path : api/v1/airport
 * req.body : {name : "string" , code :"string" ,cityID : "id", address : "string" } 
 */

async function create(req , res) {
     try {
         const airport = await AirportServices.create({
            name : req.body.name,
            code : req.body.code,
            cityID : req.body.cityID,
            address : req.body.address
         });
         SuccessResponse.data = airport;
          return res.status(StatusCodes.CREATED)
                    .json(SuccessResponse);
     } catch (error) {
          ErrorResponse.error = error;
          return res.status(error.statusCode                                 )
                    .json(ErrorResponse);
     }
}



