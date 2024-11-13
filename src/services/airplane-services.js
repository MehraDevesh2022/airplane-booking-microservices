const { AirplaneRepository } = require("../repositories")


// create instnce of AirplaneRepository to use All funcatinality

const airplaneRepository = new AirplaneRepository();
async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw error;
    }
}



module.exports ={
    createAirplane
}