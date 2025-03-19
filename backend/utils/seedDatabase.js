const Color = require("../models/Color");
const sequelize = require("../database/db");

const initialColors = [
  { name: "Aqua Green", hex: "#747953" },
  { name: "Stone Beige", hex: "#70BB17" },
  { name: "Muted Coral", hex: "#C09BC3" },
  { name: "Fuchsia Purple", hex: "#5F82E1" },
  { name: "Earthy Beige", hex: "#535378" },
  { name: "Lemon Yellow", hex: "#C4BFCE" },
  { name: "Sunflower Yellow", hex: "#574786" },
  { name: "Wheat Beige", hex: "#1641E3" },
  { name: "Terracotta Coral", hex: "#F74078" },
  { name: "Soft Mint", hex: "#929F33" },
  { name: "Ivory Beige", hex: "#CEF779" },
  { name: "Warm Coral", hex: "#162421" },
  { name: "Soft Peach", hex: "#80B966" },
  { name: "Warm Sand", hex: "#75A1D1" },
  { name: "Cobalt Blue", hex: "#A945C2" },
  { name: "Deep Sky Blue", hex: "#D56004" },
  { name: "Honey Beige", hex: "#79CF08" },
  { name: "Light Coral", hex: "#D4E862" },
  { name: "Light Tangerine", hex: "#664BBD" },
  { name: "Jade Green", hex: "#15E7FE" },
  { name: "Forest Teal", hex: "#251201" },
  { name: "Lavender Mist", hex: "#43D891" },
  { name: "Amethyst Purple", hex: "#D82910" },
  { name: "Mint Green", hex: "#B6D411" },
  { name: "Cherry Blossom", hex: "#B324B4" },
  { name: "Thistle Purple", hex: "#41BFE2" },
  { name: "Electric Blue", hex: "#FB98EB" },
  { name: "Teal Green", hex: "#C45CA1" },
  { name: "Jungle Green", hex: "#EAC6AD" },
  { name: "Rust Coral", hex: "#ABF27C" },
  { name: "Vanilla Yellow", hex: "#950CB1" },
  { name: "Dandelion Yellow", hex: "#AD7990" },
  { name: "Sky Blue", hex: "#2CD718" },
  { name: "Cherry Blossom", hex: "#891BBC" },
  { name: "Peach Cream", hex: "#484CA9" },
  { name: "Golden Yellow", hex: "#9FEAD3" },
  { name: "Pale Lavender", hex: "#17F558" },
  { name: "Spring Green", hex: "#924207" },
  { name: "Apricot Peach", hex: "#30DC36" },
  { name: "Violet Hue", hex: "#226BEA" },
  { name: "Muted Peach", hex: "#9A52C5" },
  { name: "Plum Purple", hex: "#C1242C" },
  { name: "Electric Blue", hex: "#399CFC" },
  { name: "Deep Teal", hex: "#1BE349" },
  { name: "Soft Mint", hex: "#5B003E" },
  { name: "Heather Purple", hex: "#DCB803" },
  { name: "Ivory Beige", hex: "#DE3C1A" },
  { name: "Sky Blue", hex: "#1AF67D" },
  { name: "Sunny Gold", hex: "#4E0FB2" },
  { name: "Misty Green", hex: "#52F514" },
  { name: "Rich Coral", hex: "#FAD872" },
  { name: "Golden Yellow", hex: "#FA3F76" },
  { name: "Melon Peach", hex: "#FBA91F" },
  { name: "Cobalt Blue", hex: "#DCC8BF" },
  { name: "Dusty Rose", hex: "#01C596" },
  { name: "Amethyst Purple", hex: "#7E2CBE" },
  { name: "Blush Pink", hex: "#365F5A" },
  { name: "Ocean Blue", hex: "#4A1460" },
  { name: "Dusky Pink", hex: "#3985F9" },
  { name: "Iris Purple", hex: "#B8E76A" },
  { name: "Salmon Coral", hex: "#8A11C6" },
  { name: "Eggplant Purple", hex: "#A12EBC" },
  { name: "Stone Beige", hex: "#6256E9" },
  { name: "Dandelion Yellow", hex: "#15FF73" },
  { name: "Rose Pink", hex: "#6DBAE0" },
  { name: "Desert Beige", hex: "#605673" },
  { name: "Thistle Purple", hex: "#A054C1" },
  { name: "Honey Beige", hex: "#940D49" },
  { name: "Deep Sky Blue", hex: "#5E2487" },
  { name: "Golden Yellow", hex: "#58ACB6" },
  { name: "Pistachio Green", hex: "#18A96C" },
  { name: "Mulberry Purple", hex: "#256205" },
  { name: "Pastel Yellow", hex: "#4F7B08" },
  { name: "Celadon Green", hex: "#33E6F6" },
  { name: "Emerald Green", hex: "#476786" },
  { name: "Royal Blue", hex: "#57EB83" },
  { name: "Mulberry Purple", hex: "#211E67" },
  { name: "Amethyst Purple", hex: "#694DCE" },
  { name: "Melon Peach", hex: "#9A5633" },
  { name: "Periwinkle Blue", hex: "#539DE4" },
  { name: "Golden Yellow", hex: "#B2DBB5" },
  { name: "Pale Lavender", hex: "#D14DCA" },
  { name: "Celadon Green", hex: "#83806E" },
  { name: "Flamingo Pink", hex: "#7B6A7A" },
  { name: "Rust Coral", hex: "#B9AE0E" },
  { name: "Azure Blue", hex: "#2AD775" },
  { name: "Periwinkle", hex: "#10A117" },
  { name: "Stone Beige", hex: "#D24609" },
  { name: "Wheat Beige", hex: "#D9D607" },
  { name: "Mint Green", hex: "#74B3B9" },
  { name: "Coral Sunset", hex: "#BFB8C5" },
  { name: "Thistle Purple", hex: "#176CA5" },
  { name: "Powder Peach", hex: "#83DD3E" },
  { name: "Soft Mint", hex: "#04F5AE" },
  { name: "Azure Blue", hex: "#C05A52" },
  { name: "Lemon Sorbet", hex: "#A53236" },
  { name: "Vanilla Yellow", hex: "#C506C0" },
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
