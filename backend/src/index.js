import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly specify .env path relative to src/index.js
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Test if env variables load correctly
console.log("PORT:", process.env.PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`app is runnig at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("sequelize connection failed");
  });
