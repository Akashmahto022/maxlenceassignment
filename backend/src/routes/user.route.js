import express, { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  changeCurrentPassword,
  passwordRequest,
  userLogin,
  userRegister,
  verifyUser,
  loginWithGoogle,
  getAllUsers,
  deleteUser,
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
router.route("/request/reset-password").post(passwordRequest);
router.route("/change-password").post(verifyToken, changeCurrentPassword);
router.route("/auth-with-google").get(loginWithGoogle);
router.route("/get-all").get(getAllUsers);
router.route("/delete-user/:id").delete(deleteUser);

export default router;
