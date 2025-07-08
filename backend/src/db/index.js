import { Sequelize } from "sequelize";

console.log("user db", process.env.DB_USER);

const sequelize = new Sequelize("maxlence", "root", "Akash5060@", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize };
