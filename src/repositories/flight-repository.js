const CrudRepository = require("./crud-repository");
const { Flights, Airplane, Airport } = require("../models");
const db = require("../models");
const {FLIGHT_QUERIES} = require("../utils")

class FligthRepository extends CrudRepository {
      constructor() {
            super(Flights);
      }

      async getAllFlights(filter, sort) {
            console.log(filter, sort)
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


      async updateRemainingSeats(flightId, noOfSeat, dec = true) {
               console.log("called");
               
            const t = await db.sequelize.transaction();
            try {
                  await db.sequelize.query(FLIGHT_QUERIES.addRowLockOnFlight(flightId));
                  const flight = await Flights.findByPk(flightId);
                   console.log("hello") 
                  if (!dec) {
                        await flight.decrement("totalSeats", { by: Math.abs(noOfSeat) }, { transaction: t })

                  } else {
                        await flight.increment("totalSeats", { by: Math.abs(noOfSeat) }, { transaction: t })
                  }

                  await t.commit();
                  return flight;


            } catch (error) {
                  console.log("hello2");
                  
                  await t.rollback();
                  throw error
            }
      }

}


module.exports = FligthRepository;