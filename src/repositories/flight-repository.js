const CrudRepository = require("./crud-repository");
const { Flights, Airplane, Airport } = require("../models");
const db = require("../models");

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


      async updateRemainingSeats(flightId, noOfSeat, inc = true) {

            const t = await db.sequelize.transaction();
            try {

                  const flight = await Flights.findByPk(flightId,
                        {
                              lock: true,
                              transaction: t
                        });
                 
                  if (!flight || flight.length === 0) {
                        throw new AppError(["Flight not found."], StatusCodes.NOT_FOUND);
                  }

                  if (flight.totalSeats < noOfSeat) {
                  throw new AppError(["Not enough seats available."], StatusCodes.BAD_REQUEST);
                  }

                  if (!inc) {
                        await flight.decrement("totalSeats", { by: Math.abs(noOfSeat), transaction: t})

                  } else {
                        await flight.increment("totalSeats", { by: Math.abs(noOfSeat) , transaction: t })
                  }

                  await t.commit();

                  return flight;


            } catch (error) {
                  await t.rollback();
                  throw error
            }
      }


}


module.exports = FligthRepository;   