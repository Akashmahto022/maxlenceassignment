import { sequelize } from "../db/index.js";
import { userModel } from "./user.model.js";

const User = userModel(sequelize);

export { sequelize, User };
