
const { logger } = require("../config");



class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            logger.error("Somthing went wrong in the Crud Repo: create");
            throw error;

        }

    }


    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return response;
        } catch (error) {
            logger.error("Somthing went wrong in Crud Repo: destroy");
            throw error;

        }
    }


    async get(data) {
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            logger.error("Somhting went wrong in Crud Repo: get");
            throw error;
        }
    }


    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            logger.error("Somhting went wrong in Crud Repo: getAll");
            throw error;
        }
    }


    async update(id, data) { // data => {col: value, ....}
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            logger.error("Somhting went wrong in Crud Repo: update");
            throw error;
        }
    }

}


module.exports = CrudRepository