const { CityServices } = require("../services")
const { ErrorResponse, SuccessResponse } = require("../utils");
const StatusCodes = require("http-status-codes")

/**
 * post : api/v1/city
 * req.body : {name : "string"} 
 */

async function createCity(req, res) {
    try {
        console.log(req.body);
        
        const city = await CityServices.createCity(req.body);
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        console.log(error , "err");
        
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}


/**
 * get : api/v1/city/:id
 * req.body : {}
 */

async function getCity(req, res) {
    try {
        const city = await CityServices.getCity(req.params.id);
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
 * get : api/v1/city
 * req.body : {}
 */

async function getCities(req, res) {
    try {
     
        
        const cities = await CityServices.getCities();
        SuccessResponse.data = cities;
        return res.status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        
        return res.status(error.statusCode)
                .json(ErrorResponse);
    }
}


/**
 * delete : api/v1/city/:id
 * req.body  : {}
 */

async function destroyCity(req, res) {
    try {
       
        
        const city = await CityServices.destoryCity(req.params.id);
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
 * patch : api/v1/city/:id
 * req.body : {}
 */


async function updateCity(req, res) {
    try {
        const city = await CityServices.updateCity(req.params.id , req.body);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK)
                 .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        
        ErrorResponse.error = error;
        return res.status(error.statusCode)
                  .json(ErrorResponse);
    }
}



module.exports  = {
    createCity,
    updateCity,
    getCities,
    getCity,
    destroyCity
}