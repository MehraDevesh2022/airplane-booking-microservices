'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
        foreignKey: "cityId",
      })

      this.hasMany(models.Flights, {
        foreignKey: "arrivalAirportId",
        sourceKey: "code",
        as: "arrivalAirport",
        onDelete: "CASCADE",

      })

      this.hasMany(models.Flights, {
        foreignKey: "departureAirportId",
        sourceKey: "code",
        as: "departureAirport",
        onDelete: "CASCADE",
      })

    }
  }
  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};