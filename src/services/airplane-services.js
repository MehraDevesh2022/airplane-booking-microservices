const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories")
const { AppError } = require("../utils")

// create instnce of AirplaneRepository to use All funcatinality

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {

        // validation error that can be client error like "wrong input"
        if (error.name == "SequelizeValidationError") { // error object defined by Sequelize
            let explanation = [];
            error.errors.forEach(err => { // errors is array which can have muliple error at same time
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }

        // serever errors
        throw new AppError(["Cannot create new airplane object."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;

    } catch (error) {
        throw new AppError(["Cannot fetch data of all airplanes."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;

    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(["The airplane you requested is not present."], StatusCodes.NOT_FOUND)
        }
        throw new AppError(["Cannot fetch data of the airplane."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function updateAirplane(id, data) {
    try {
        const airplane = await airplaneRepository.update(id, data);
        return airplane;
    } catch (error) {
        if (error.name == "SequelizeValidationError" || error.statusCode == StatusCodes.NOT_FOUND) {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError(["Cannot update data of the airplane."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function distroyAirplane(id) {
    try {
        const airplane = await airplaneRepository.destroy(id);
        return airplane;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError(["Cannot delete data of the airplane."], StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirplane,
    updateAirplane,
    getAirplane,
    getAirplanes,
    distroyAirplane
}