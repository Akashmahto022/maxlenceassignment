import { sequelize } from "../models/index.js";

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("The table for the User model was just (re)created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connectDB };
