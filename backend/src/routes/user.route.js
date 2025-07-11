import express, { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  userLogin,
  userRegister,
  verifyUser,
} from "../controllers/user.controller.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.fields([{ name: "userProfileImage", maxCount: 1 }]),
    userRegister
  );

router.route("/verifyUser").get(verifyUser);
router.route("/userlogin").post(userLogin);

export default router;
