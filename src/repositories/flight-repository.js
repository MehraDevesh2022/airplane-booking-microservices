const CrudRepository  = require("./airport-repository");
const {Flights} = require("../models");


class FligthRepository extends CrudRepository{
       constructor(){
        super(Flights);
       }
}


module.exports = FligthRepository;