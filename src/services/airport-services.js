const { AirportRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils");


const airportRepository = new AirportRepository();

async function createAirport(data) {
   
    
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    console.log("err", error);
    
    
    if (error.name == "SequelizeValidationError" ) {
      let explanation = [];
      error.errors.forEach(err => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(["Cannot create new airport object."], StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(["Cannot get data of airports."], StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(["The airport you requested is not present."], StatusCodes.NOT_FOUND);
    }
    throw new AppError(["Cannot get data of airport."], StatusCodes.INTERNAL_SERVER_ERROR);

  }
}

async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(id, data);
    return airport;
  } catch (error) {
    if(error.name  == "SequelizeValidationError" || error.name  =="SequelizeUniqueConstraintError"){
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      })
 }else if(error.statusCode == StatusCodes.NOT_FOUND){
       throw new AppError(["The airport you requested is not present."] , StatusCodes.NOT_FOUND)
 } else{
  throw new AppError(["Cannot update the data of airport."] , StatusCodes.INTERNAL_SERVER_ERROR)
 }
  }
}


async function destroyAirport(id) {
  try {
    const airport = await airportRepository.destroy(id);
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(["The airport you requested is not present."], StatusCodes.NOT_FOUND);
    }
    throw new AppError(["Cannot delete data of airport."], StatusCodes.INTERNAL_SERVER_ERROR);

  }
}

module.exports = {
  createAirport,
  updateAirport,
  destroyAirport,
  getAirport,
  getAirports,
  
}