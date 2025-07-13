import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  verifyUserToken,
  generateRefreshToken,
} from "../utils/jwtToken.utils.js";
import { sendMailToUser } from "../config/nodemailer.config.js";
import { oauth2client } from "../config/googleAuth.config.js";
import axios from "axios";
import { where } from "sequelize";

const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user already exist
    const userAlreadyExist = await User.findOne({ where: { email } });
    if (userAlreadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password hash
    const userHashPassword = await bcrypt.hash(req.body.password, 10);
    const isMatch = await bcrypt.compare(req.body.password, userHashPassword);
    console.log("isMatch", isMatch);
    // getting file path
    const userProfileImagePath = req.files?.userProfileImage[0]?.path;

    // create new user
    const newUser = await User.create({
      email,
      userPassword: userHashPassword,
      userProfileImage: userProfileImagePath,
    });

    // generate token for email
    const token = generateAccessToken(newUser);
    console.log(token);
    newUser.emailVerificationToken = token;
    User.update(
      { emailVerificationToken: token },
      { where: { id: newUser.id } }
    );

    const verificationLink = `http://localhost:8000/api/v1/user/verifyUser?token=${token}`;

    const mailOption = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Email Verification",
      html: `<p>Please verify your email by clicking on this link: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    await sendMailToUser(mailOption);

    res
      .status(200)
      .json({ message: "user created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "getting error while creating user", error: error });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { token } = req.query;
    const decodeToken = verifyUserToken(token);
    if (!decodeToken) {
      return res
        .status(400)
        .json({ message: "invalid or expired verification link" });
    }

    const currentUser = await User.findByPk(decodeToken.id);
    if (!currentUser) {
      return res.status(404).json({ message: "user not found." });
    }

    const updatedUser = await User.update(
      {
        isUserVerifiedEmail: true,
        emailVerificationToken: null,
      },
      { where: { id: currentUser.id } }
    );

    res.status(200).json({ message: "user verified! now you can login." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while verify the user", error: error });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("getting data", req.body);
    if (!email || !password) {
      return res.status(404).json({ message: "provide all required fields" });
    }

    const currentUser = await User.findOne({ where: { email } });
    console.log("getting current user", currentUser);
    // if not user
    if (!currentUser) {
      return res
        .status(401)
        .json({ message: "This is email Id is not regitered" });
    }

    // if not verify
    if (currentUser.isUserVerifiedEmail == false) {
      return res
        .status(404)
        .json({ message: "first verify you email address and then login." });
    }

    //password compare
    const isCorrectPassword = await bcrypt.compare(
      password,
      currentUser.userPassword
    );
    // console.log("correct password", isCorrectPassword);

    // if (!isCorrectPassword) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    const accessToken = generateAccessToken(currentUser);
    const refreshToken = generateRefreshToken(currentUser);
    currentUser.userRefreshToken = refreshToken;
    const savedUser = await currentUser.save();

    console.log("saved user", savedUser);

    const options = {
      httpOnly: true,
      secure: false,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refereshToken", refreshToken, options)
      .json({
        message: "login successfully",
        user: currentUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "getting error while login user", error: error });
  }
};

const passwordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User Not exists with this mail" });
    }
    console.log(user);
    const verificationLink = `http://localhost:5173/change-password`;

    const mailOption = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "password verification link",
      html: `<p>change you password by clicking on this link: <a href="${verificationLink}">Change Password</a></p>`,
    };
    await sendMailToUser(mailOption);

    res.status(200).json({ message: "password reset mail send to the user" });
  } catch (error) {
    return res.status(200).json({
      message: "error while sending the request of password reset link",
    });
  }
};

const changeCurrentPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    const user = await User.findByPk(req.user?.id);

    const isMatchPassword = password === confirmPassword;
    if (!isMatchPassword) {
      return res.status(401).json({ message: "both password should match" });
    }

    const newHashPassword = bcrypt.hashSync(password, 6);

    user.userPassword = newHashPassword;
    await user.save();

    res.status(200).json({ message: "password change successfuly" });
  } catch (error) {
    res.status(500).json({ message: "error while change password", error });
    console.log("error while changing the password", error);
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { code } = req.query;
    console.log("getting code", code);

    const googleResponse = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleResponse.tokens);
    console.log("google response", googleResponse);

    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
    );
    console.log("user data from google apis", userResponse);

    const { email, name, picture } = userResponse.data;
    const isUserExists = await User.findOne({ where: { email } });
    console.log("user esists or not", isUserExists);
    if (isUserExists) {
      const accessToken = generateAccessToken(isUserExists);
      const refreshToken = generateRefreshToken(isUserExists);
      isUserExists.userRefreshToken = refreshToken;
      const savedUser = await isUserExists.save();

      console.log("saved user", savedUser);

      const options = {
        httpOnly: true,
        secure: false,
      };

      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refereshToken", refreshToken, options)
        .json({
          message: "login successfully",
          user: savedUser,
          accessToken,
          refreshToken,
        });
    }

    const newUser = await User.create({
      email,
      userProfileImage: picture,
      isUserVerifiedEmail: true,
      isUserRegisterWithLoginWithGoogle: true,
    });
    console.log("created a new user", newUser);

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    newUser.userRefreshToken = refreshToken;
    const savedUser = await newUser.save();

    console.log("saved user", savedUser);

    const options = {
      httpOnly: true,
      secure: false,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refereshToken", refreshToken, options)
      .json({
        message: "login successfully",
        user: savedUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("error while authenticate user with google login ", error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ message: "here is the list of users", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("deleting user with id", id);
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export {
  userRegister,
  verifyUser,
  userLogin,
  passwordRequest,
  changeCurrentPassword,
  loginWithGoogle,
  deleteUser,
  getAllUsers,
};
