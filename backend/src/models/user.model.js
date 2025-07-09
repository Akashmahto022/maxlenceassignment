import { DataTypes, Sequelize } from "sequelize";

const userModel = (sequelize) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userProfileImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRole: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    userRefreshToken: {
      type: DataTypes.STRING,
    },
  });
  return User;
};

export { userModel };
