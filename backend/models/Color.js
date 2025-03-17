const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Color = sequelize.define("Color", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Color;
