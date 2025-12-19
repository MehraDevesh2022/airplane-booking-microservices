const { CityRepository } = require("../repositories")
const { AppError } = require("../utils")
const {StatusCodes} = require("http-status-codes")

const cityRepository = new CityRepository();
async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
       if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explnation = [];
            error.errors.forEach((err) => {
                explnation.push(err.message)
            })

            throw new AppError(explnation, StatusCodes.BAD_REQUEST)

        }
        throw new AppError(["Cannot create data of city."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;

    } catch (error) {
       
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(["The city you requested is not presented."], StatusCodes.NOT_FOUND)
        }
        throw new AppError(["cannot fetch data of city."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function getCities() {
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError(["Cannot fetch data of cities."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function destoryCity(id) {
    try {
      
        
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
      
        console.log("err" , error.explanation);
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(["The City you requested is not present."], StatusCodes.NOT_FOUND)
        }
        throw new AppError(["Cannot delete data of city."], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
    
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        console.log("err", error);

        if (error.name == "SequelizeValidationError"  || error.name == "SequelizeUniqueConstraintError") {
            let explnation = [];
            error.errors.forEach((err) => {
                explnation.push(err.message);
            });
            throw new AppError(explnation, error.statusCode == StatusCodes.NOT_FOUND ? StatusCodes.NOT_FOUND : StatusCodes.BAD_REQUEST);
        }else if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError(["The City you requested is not present."], StatusCodes.NOT_FOUND)
        }else{
            throw new AppError(["Cannot update data of city."], StatusCodes.INTERNAL_SERVER_ERROR);
        }
        

    }
}


module.exports = {
    createCity,
    updateCity,
    getCities, 
    getCity,
    destoryCity
}