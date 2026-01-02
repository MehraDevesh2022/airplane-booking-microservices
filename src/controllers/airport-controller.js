const { AirportServices } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils");
const { StatusCodes } = require("http-status-codes");


/**
 * method : post
 * path : api/v1/airport
 * req.body : {name : "string" , code :"string" ,cityID : "id", address : "string" } 
 * 
 */

async function createAirport(req, res) {
     try {

          
          const airport = await AirportServices.createAirport({
               name: req.body.name,
               code: req.body.code,
               cityId: req.body.cityId,
               address: req.body.address
          });

          SuccessResponse.data = airport;
          return res.status(StatusCodes.CREATED)
               .json(SuccessResponse);
     } catch (error) {
          ErrorResponse.error = error;
          return res.status(error.statusCode)
               .json(ErrorResponse);
     }
}

/**
 * method : delete
 * path : api/v1/airport/:id,
 * req.body : {}
 */

async function destroyAirport(req, res) {
     try {
          const airport = await AirportServices.destroyAirport(req.params.id)
          SuccessResponse.data = airport;
          return res.status(StatusCodes.OK)
               .json(SuccessResponse);
     } catch (error) {
          ErrorResponse.error = error;
          return res.status(error.statusCode)
               .json(ErrorResponse);
     }
}

/**
 * method : patch
 * path : api/v1/airport/:id,
 * req.body :  req.body : {name : "string" , code :"string" ,cityID : "id", address : "string" } 
 */

async function updateAirport(req, res) {
     try {
          const city = await AirportServices.updateAirport(req.params.id, req.body);
          SuccessResponse.data = city;
          return res.status(StatusCodes.OK)
               .json(SuccessResponse);
     } catch (error) {
          ErrorResponse.error = error;
          return res.status(error.statusCode)
               .json(ErrorResponse);
     }
}


/**
 * method : get
 * path : api/v1/airport/:id,
 * req.body :  {}
 */

async function getAirport(req, res) {
     try {
          const airport = await AirportServices.getAirport(req.params.id);
          SuccessResponse.data = airport;
          return res.status(StatusCodes.OK)
               .json(SuccessResponse);
     } catch (error) {
          ErrorResponse.error = error;
          return res.status(error.statusCode)
               .json(ErrorResponse);
     }
}


/**
* method : get
* path : api/v1/airport/:id,
* req.body :  {}
*/

async function getAirports(req, res) {
     try {
          const airports= await AirportServices.getAirports();
          SuccessResponse.data = airports;
          return res.status(StatusCodes.OK)
               .json(SuccessResponse);
     } catch (error) {
          ErrorResponse.error = error;
          return res.status(error.statusCode)
               .json(ErrorResponse);
     }
}


module.exports = {
     createAirport,
     destroyAirport,
     updateAirport,
     getAirport, 
     getAirports
}