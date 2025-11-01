module.exports = {
    FLIGHT_QUERIES : {
        addRowLockOnFlight : () => {
            return `SELECT * FROM "Flights" WHERE id =$1 FOR UPDATE ;`
        }
    }
}

