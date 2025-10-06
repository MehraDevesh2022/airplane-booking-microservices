module.exports = {
    FLIGHT_QUERIES : {
        addRowLockOnFlight : (flightId) => {
            return `SELECT * FROM "Flights" WHERE id =${flightId} FOR UPDATE ;`
        }
    }
}

