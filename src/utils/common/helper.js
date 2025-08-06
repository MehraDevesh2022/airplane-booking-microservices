function compareDates(departureTime , arrivalTime){
      const departure_date  = new Date(departureTime);
      const arrival_date  = new Date(arrivalTime);
      return departure_date <= arrival_date;
}

module.exports = {
    compareDates
}