const CrudRepository = require("./crud-repository");
const { Airplane } = require("../models")

// all basic function alredy comes from  CrudRepository => {create , destory , ...etc}
class AirplaneRepository extends CrudRepository {
    constructor() {
        super(Airplane); // parent class expact model in constructor
    }
}


module.exports = AirplaneRepository;