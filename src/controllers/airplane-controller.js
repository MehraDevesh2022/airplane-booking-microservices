const { StatusCodes } = require("http-status-codes")
const { AirplaneService } = require("../services");


/**
 * POST : /airplane
 * req.body : {modelNumber : "airbus320" , capacity : 180}
 */

async function createAirplane(req, res) {

    try {
        console.log(req.body);
        
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res.status(StatusCodes.CREATED)
            .json({
                sucsess: true,
                message: "Sucessfully create an airplane",
                data: airplane,
                error: {}
            })


    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                sucsess: false,
                message: "Somthing went wrong while creating airplane.",
                data: {},
                error: error
            })

    }
}

module.exports = {
    createAirplane
}