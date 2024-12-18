const CrudRepository  = require("./crud-repository");
const {Flights} = require("../models");
const { where } = require("sequelize");


class FligthRepository extends CrudRepository{
       constructor(){
        super(Flights);
       }

       async getAllFlights(filter , sort){
        const response = await Flights.findAll({
              where : filter,
              order : sort
        })
        return response;
       }
}


module.exports = FligthRepository;