const { StatusCodes } = require("http-status-codes")
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils");


/**
 * POST : /airplane
 * req.body : {modelNumber : "airbus320" , capacity : 180}
 */

async function createAirplane(req, res) {

    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });


        SuccessResponse.data = airplane;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);


    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);

    }
}


/**
 * GET : /airplane
 * req.body : {},
 */

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}


/**
 * GET: airplane/:id
 * req.body : {}
 */

async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * DELETE : airplane/:id,
 * req.body : {}
 */

async function destroyAirplane(req, res) {
    try {
        const airplane = await AirplaneService.distroyAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * UPDATE : airplane/:id,
 * req.body : {modelNumber :value}
 */

async function updateAirplane(req, res) {
    try {
        const airplane = await AirplaneService.updateAirplane(req.params.id, req.body);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK)
                  .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
                  .json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    updateAirplane,
    destroyAirplane,
    getAirplane,
    getAirplanes
}