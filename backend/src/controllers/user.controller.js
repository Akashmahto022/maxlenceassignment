import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  verifyUserToken,
  generateRefreshToken,
} from "../utils/jwtToken.utils.js";
import { sendMailToUser } from "../config/nodemailer.config.js";
import { where } from "sequelize";

const userRegister = async (req, res) => {
  try {
    const { email, userPassword } = req.body;

    // check user already exist
    const userAlreadyExist = await User.findOne({ where: { email } });
    console.log(userAlreadyExist);
    if (userAlreadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password hash
    const userHashPassword = await bcrypt.hash(userPassword, 10);

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

    const verificationLink = `http://localhost:3000/api/users/verify-email?token=${token}`;

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

    const currentUser = User.findById(decodeToken.userId);

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
  const { email, userPassword } = req.body;

  if (!email || !userPassword) {
    return res.status(404).json({ message: "provide all required fields" });
  }

  const currentUser = await User.findOne({ where: { email } });

  // if not user
  if (!currentUser) {
    return res
      .status(404)
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
    userPassword,
    currentUser.updatedUser
  );

  if (!isCorrectPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(currentUser);
  const refreshToken = generateRefreshToken(currentUser);
  currentUser.refreshToken = refreshToken;
  await currentUser.save();

  const options = {
    httpOnly: true,
    secure: true,
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
};

export { userRegister, verifyUser };
