const { Sequelize } = require("sequelize");

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/colors.db",
  logging: false,
});

module.exports = sequelize;
