const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");


const flightRepository = new FlightRepository();

async function createFlight(data) {

    try {


        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {


        if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            })

            throw new AppError(explanation, StatusCodes.BAD_REQUEST)

        }
        throw new AppError(["Cannot create data of flight."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;

    } catch (error) {
        if (error.statusCode = StatusCodes.NOT_FOUND) {

            throw new AppError(["The flight you requested is not presented."], StatusCodes.NOT_FOUND)
        }
        throw new AppError(["cannot fetch data of flight."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function getFlights(query) {


    let customFilter = {}; // { departureTime: { [Op.gte]: "2021-09-01 00:00:00" }  , arrivalTime: { [Op.lte]: "2021-09-01 23:59:00" } }
    let sortFilter = []; // [ [ 'price', 'DESC' ]  , [ 'departureTime', 'ASC' ] ]
    const endingTripTime = " 23:59:00";


    const validateQuery = (query) => {
        if (query.trips) {
            let [departureAirportId, arrivalAirportId] = query.trips.split("-");
            if (!departureAirportId || !arrivalAirportId || departureAirportId === arrivalAirportId) {
                throw new AppError(["Invalid trips."], StatusCodes.BAD_REQUEST)
            }
            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;

        }

        if (query.price) {
            const [minPrice, maxPrice] = query.price.split("-");

            customFilter.price = {
                [Op.between]: [(parseFloat(minPrice) || 0), (parseFloat(maxPrice) || 2000)]
            }
        }
        if (query.travelers) {
            let travelers = query.travelers.split('-').map(Number); // will convert in array and map(Number) will parse in int
            let totalTravelers = travelers.reduce((acc, curr) => acc + curr, 0);
            if (totalTravelers < 0) {
                throw new AppError(["Invalid number of travelers.".StatusCodes.BAD_REQUEST]);

            }
            customFilter.totalSeats = {
                [Op.gte]: totalTravelers
            }
        }
        if (query.tripDate) {
            if (isNaN(Date.parse(query.tripDate))) {
                throw new AppError(["Invalid tripDate.", StatusCodes.BAD_REQUEST])
            }
            customFilter.departureTime = {
                [Op.between]: [query.tripDate, query.tripDate + endingTripTime]  // 2021-09-01 00:00:00  , 2021-09-01 23:59:00
            }
        }
        if (query.sort) {
            // query.sort = price_DESC , departureTime_ASC
            let sortData = query.sort.split(","); // [price_DESC , departureTime_ASC]
            let sort = sortData.map((sort => sort.split("_"))); // [ [price , DESC] , [departureTime , ASC] ]
            sortFilter = sort

        }


    }

    try {
        validateQuery(query);
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log("Error in service layer:", error);

        throw new AppError(["Cannot fetch data of Flights."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



async function destroyFlight(id) {
    try {


        const flight = await flightRepository.destroy(id);
        return flight;
    } catch (error) {


        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(["The flight you requested is not present."], StatusCodes.NOT_FOUND)
        }
        throw new AppError(["Cannot delete data of flight."], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateFlightSeats(id, noOfSeat, inc) {
    try {


        const flight = await flightRepository.updateRemainingSeats(id, noOfSeat, inc);
        return flight;
    } catch (error) {
        if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, error.statusCode == StatusCodes.NOT_FOUND ? StatusCodes.NOT_FOUND : StatusCodes.BAD_REQUEST);
        } else if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(["The flight you requested is not present."], StatusCodes.NOT_FOUND)
        } else {
            throw new AppError(["Cannot update seats of flight."], StatusCodes.INTERNAL_SERVER_ERROR);
        }


    }
}



module.exports = {
    createFlight,
    updateFlightSeats,
    getFlights,
    getFlight,
    destroyFlight
}