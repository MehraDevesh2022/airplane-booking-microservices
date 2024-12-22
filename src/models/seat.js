'use strict';
const {
  Model
} = require('sequelize');

const {Enum} = require("../utils");
const {BUSINESS , FIRST_CLASS ,PREMIUM_ECONOMY ,ECONOMY } = Enum.SEAT_TYPE
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seat.init({
    airplaneId: {
      type : DataTypes.INTEGER,
      allowNull : false
       
    },
    row: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    col: {
      type : DataTypes.STRING,
      allowNull : false
    }, 

    seat_type : 
      type : DataTypes.ENUM,
      values : [ECONOMY , BUSINESS , PREMIUM_ECONOMY , FIRST_CLASS],
      defaultValue : ECONOMY,
      allowNull : false
    }
    
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};