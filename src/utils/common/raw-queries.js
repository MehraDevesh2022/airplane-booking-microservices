module.exports = {
    FLIGHT_QUERIES : {
        addRowLockOnFlight : (flightId) => `SELECT * FROM "Flights" WHERE id = ${flightId} FOR UPDATE`
    }
}

