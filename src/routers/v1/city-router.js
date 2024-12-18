const express = require("express");
const router = express.Router();
const { CityMiddleware } = require("../../middlewares")
const { CityController } = require("../../controllers")

/**
 * route : api/v1/city
 * method : post
 * logic : create
 */

router.post("/", CityMiddleware.vaildateCityInputs
              , CityController.createCity
);


/**
 * route : api/v1/city/:id
 * method : get
 * logic : get city by id
 */

router.get("/:id",  CityController.getCity);

/**
 * route : api/v1/cities
 * method : get
 * logic : get all city
 */

router.get("/", CityController.getCities);


/**
 * route : api/v1/city
 * method : patch
 * logic : update city 
 */

router.patch("/:id", CityMiddleware.vaildateCityInputs ,
                  CityController.updateCity);


/**
 * route : api/v1/city/:id
 * method : delete
 * logic : delete city by id
 */

router.delete("/:id",  CityController.destoryCity);


module.exports = router;