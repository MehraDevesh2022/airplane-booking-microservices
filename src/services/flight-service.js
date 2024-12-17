const {FligthRepository} = require("../repositories");
const {AppError} = require("../utils");
const {StatusCodes} = require("http-status-codes");



const fligthRepository = new FligthRepository();

async function createFlight(data) {

    try {
       
        
        const flight = await fligthRepository.create(data);
        return flight;
    } catch (error) {
        console.log("Error in service layer:", error);
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
       
    //
 
 
    try {
        const flights = await fligthRepository.getAll();
        return flights;
    } catch (error) {
        throw new AppError(["Cannot fetch data of cities."], StatusCodes.INTERNAL_SERVER_ERROR)
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

async function updateFlight(id, data) {
    try {
    
        const flight = await fligthRepository.update(id, data);
        return flight;
    } catch (error) {
        console.log("err", error);

        if (error.name == "SequelizeValidationError"  || error.name == "SequelizeUniqueConstraintError") {
            let explnation = [];
            error.errors.forEach((err) => {
                explnation.push(err.message);
            });
            throw new AppError(explnation, error.statusCode == StatusCodes.NOT_FOUND ? StatusCodes.NOT_FOUND : StatusCodes.BAD_REQUEST);
        }else if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(["The flight you requested is not present."], StatusCodes.NOT_FOUND)
        }else{
            throw new AppError(["Cannot update data of flight."], StatusCodes.INTERNAL_SERVER_ERROR);
        }
        

    }
}


module.exports = { 
    createFlight,
    updateFlight,
    getFlights, 
    getFlight,
    destoryFlight
}