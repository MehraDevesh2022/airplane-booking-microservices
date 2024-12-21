const CrudRepository = require("./crud-repository");
const { Flights, Airplane, Airport } = require("../models");
const { where } = require("sequelize");


class FligthRepository extends CrudRepository {
      constructor() {
            super(Flights);
      }

      async getAllFlights(filter, sort) {
            const response = await Flights.findAll({
                  where: filter,
                
                include: [

                 {
                   model: Airplane,
                  required: true
                  },
                  {
                    model: Airport,
                    as: "departureAirport",
                    required: true,
                  },
                  {
                    model: Airport,
                    as: "arrivalAirport",
                    required: true,
                  },
                  ],

                  order: sort
            })


            return response;
      }
}


module.exports = FligthRepository;