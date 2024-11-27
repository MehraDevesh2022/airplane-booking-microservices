const {AirportRepository} = require("../repositories");
const {StatusCodes} = require("http-status-codes");
const {AppError} = require("../utils");


const airportRepository = new AirportRepository();

async function create(data) {
       try {
         const airport  = await airportRepository.create(data);
         return airport;
       } catch (error) {
          if(error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach(err => {
                 explanation.push(err.message);
            });

            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
          }
            throw new AppError(["Cannot create new airport object."] , StatusCodes.INTERNAL_SERVER_ERROR);
       }
}


module.exports ={
    create
}