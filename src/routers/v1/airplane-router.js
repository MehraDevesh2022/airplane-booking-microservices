const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers")
const { AirplaneMiddleware } = require("../../middlewares")
/**
 * path : api/v1/airplane 
 * method : post
 * logic : create
 */
router.post("/", AirplaneMiddleware.validateCreateRequest,
    AirplaneController.createAirplane);


/**
* path : api/v1/airplane 
* method : get
* logic : get all
*/

router.get("/", AirplaneController.getAirplanes)

/**
* path : api/v1/airplane/:id 
* method : get
* logic : get by id
*/

router.get("/:id", AirplaneController.getAirplane);

/**
* path : api/v1/airplane/:id 
* method : delete
* logic : delete by id
*/

router.delete("/:id", AirplaneController.destroyAirplane);

/**
* path : api/v1/airplane/:id 
* method : patch
* logic : update by id
*/

router.patch("/:id",
    AirplaneMiddleware.validateCreateRequest,
    AirplaneController.updateAirplane);
module.exports = router