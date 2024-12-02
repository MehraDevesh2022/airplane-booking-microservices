'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Airport, {
        foreignKey : "cityID",
        onDelete : "CASCADE",
      })
      
    }
  }
  City.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isString(value){
          if(typeof value !="string"){
            throw new Error('Only strings are allowed');
          }
        }
      }


    }
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};