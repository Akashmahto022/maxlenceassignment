import express, { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userRegister, verifyUser } from "../controllers/user.controller.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: userProfile, maxCount: 1 }]), userRegister);

router.route("/verifyUser").post(verifyUser);
