import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new apiError(401, "Unauthorized requrest");
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      // todo discuss about front end
      throw new apiError(401, "invalid Access token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while verify token", error: error });
  }
};
