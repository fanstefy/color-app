const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Color = require("./models/Color");
const sequelize = require("./database/db");
const { Sequelize } = require("sequelize");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync({ force: false }); // keeps data if DB exists, creates if not
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();

app.get("/colors", async (req, res) => {
  const { search } = req.query;

  try {
    let colors;
    if (search) {
      colors = await Color.findAll({
        where: {
          [Sequelize.Op.or]: [
            { name: { [Sequelize.Op.like]: `%${search}%` } },
            { hex: { [Sequelize.Op.like]: `%${search}%` } },
          ],
        },
      });
    } else {
      colors = await Color.findAll();
    }

    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching colors", error });
  }
});

app.post("/colors", async (req, res) => {
  const { name, hex } = req.body;
  if (!name || !hex) {
    return res.status(400).json({ message: "Name and hex are required" });
  }

  try {
    const newColor = await Color.create({ name, hex });
    res.status(201).json(newColor);
  } catch (error) {
    res.status(500).json({ message: "Error adding color", error });
  }
});

app.delete("/colors/:id", async (req, res) => {
  const colorId = req.params.id;
  const color = await Color.findByPk(colorId);

  if (!color) {
    return res.status(404).json({ message: "Color not found" });
  }

  await color.destroy();
  res.json({ message: "Color deleted" });
});
