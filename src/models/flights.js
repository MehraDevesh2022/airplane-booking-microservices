'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane , {
        foreignKey : "airplaneID",
      })

      this.belongsTo(models.Airport, {
        foreignKey : "departuerAirportID"
      })

       this.belongsTo(models.Airport, {
        foreignKey : "arrivelAirportID"
       })
    }
  }
  Flights.init({
    flightNumber:{
      type :  DataTypes.STRING,
      allowNull :false
    },
    airplaneID: {
      type :  DataTypes.STRING,
      allowNull : false
    },
    departuerAirportID: {
      type :  DataTypes.STRING,
      allowNull :false
    },
    arrivelAirportID:  {
      type :  DataTypes.STRING,
      allowNull :false
    },
    arrivalTime:{
      type :DataTypes.DATE,
      allowNull :false
    },
    departureTime: {
      type :DataTypes.DATE,
      allowNull :false
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull :false
    },
    boardingGate: {
      type :DataTypes.STRING
    },
    totalSeats: {
      type : DataTypes.INTEGER,
      allowNull :false
    }
  }, {
    sequelize,
    modelName: 'Flights',
  });
  return Flights;
};