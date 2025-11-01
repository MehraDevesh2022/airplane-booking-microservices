const { FligthRepository } = require("../repositories");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");


const fligthRepository = new FligthRepository();

async function createFlight(data) {
 
    try {


        const flight = await fligthRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error , "service")

        if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explnation = [];
            error.errors.forEach((err) => {
                explnation.push(err.message)
            })

            throw new AppError(explnation, StatusCodes.BAD_REQUEST)

        }
        throw new AppError(["Cannot create data of flight."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function getFlight(id) {
    try {
        const flight = await fligthRepository.get(id);
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
        if (query.travellers) {
            let travellers = query.travellers.split('-').map(Number); // will convert in array and map(Number) will aprse in int
            let totalTravellers = travellers.reduce((acc, curr) => acc + curr, 0);
            if (totalTravellers < 0) {
                throw new AppError(["Invalid number of travellers.".StatusCodes.BAD_REQUEST]);

            }
            customFilter.totalSeats = {
                [Op.gte]: totalTravellers
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
            // qury.sort = price_DESC , departureTime_ASC
            let sortData = query.sort.split(","); // [price_DESC , departureTime_ASC]
            let sort = sortData.map((sort => sort.split("_"))); // [ [price , DESC] , [departureTime , ASC] ]
            sortFilter = sort

        }


    }

    try {
        validateQuery(query);
        const flights = await fligthRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log("Error in service layer:", error);

        throw new AppError(["Cannot fetch data of Flights."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



async function destoryFlight(id) {
    try {


        const flight = await fligthRepository.destroy(id);
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


        const flight = await fligthRepository.updateRemainingSeats(id, noOfSeat, inc);
        return flight;
    } catch (error) {
        console.log("err", error);

        if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explnation = [];
            error.errors.forEach((err) => {
                explnation.push(err.message);
            });
            throw new AppError(explnation, error.statusCode == StatusCodes.NOT_FOUND ? StatusCodes.NOT_FOUND : StatusCodes.BAD_REQUEST);
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
    destoryFlight
}