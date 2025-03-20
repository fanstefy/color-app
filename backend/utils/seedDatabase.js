const Color = require("../models/Color");
const sequelize = require("../database/db");

const initialColors = [
  { name: "Aqua Green", hex: "#747953" },
  { name: "Stone Beige", hex: "#70BB17" },
  { name: "Muted Coral", hex: "#C09BC3" },
  { name: "Fuchsia Purple", hex: "#5F82E1" },
];

const seedDatabase = async () => {
  try {
    await sequelize.sync();

    const count = await Color.count();
    if (count === 0) {
      console.log("Seeding initial color data...");

      await Color.bulkCreate(initialColors);
      console.log("Database successfully seeded!");
    } else {
      console.log("Database already has data. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedDatabase;
