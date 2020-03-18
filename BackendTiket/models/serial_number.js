'use strict';
module.exports = (sequelize, DataTypes) => {
  const serial_number = sequelize.define('serial_number', {
    name: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {});
  serial_number.associate = function(models) {
    // associations can be defined here
  };
  return serial_number;
};