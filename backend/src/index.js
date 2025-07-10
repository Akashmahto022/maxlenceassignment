import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`app is runnig at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("sequelize connection failed");
  });
