import { DataTypes, Sequelize } from "sequelize";

const userModel = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPassword: {
      type: DataTypes.STRING,
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
    isUserVerifiedEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isUserRegisterWithLoginWithGoogle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });

  return User;
};

export { userModel };
