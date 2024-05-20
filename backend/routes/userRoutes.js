import express from "express";
import { createUser, loginUser, logoutCurrentUser } from '../controllers/userController.js';

const router = express.Router();
router.route("/").post(createUser);
router.post("/auth", loginUser);//LOGIN
router.post("/logout", logoutCurrentUser);//LOGOUT

export default router;
