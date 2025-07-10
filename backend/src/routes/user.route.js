import express, { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { userRegister, verifyUser } from "../controllers/user.controller.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.fields([{ name: "userProfileImage", maxCount: 1 }]),
    userRegister
  );

router.route("/verifyUser").post(verifyUser);

export default router;
