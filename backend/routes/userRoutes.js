import express from "express";
import { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentlyUserProfile, updateCurrentlyUserProfile} from '../controllers/userController.js';

import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";

//DICHIERAZIONE ROUTER
const router = express.Router();



//CREATE USER  users solo se autenticato(loggato)possiediuntoken + autorizzatoComeAdmin(isAdmin: true) allroa restituisce tutti gli user
router.route("/").post(createUser).get(authenticate,authorizeAdmin,getAllUsers);
//UPDATE users solo se auth+token
router.route("/profile")
                        .get(authenticate, getCurrentlyUserProfile)
                        .put(authenticate, updateCurrentlyUserProfile)


//LOGIN
router.post("/auth", loginUser);
//LOGOUT
router.post("/logout", logoutCurrentUser);

export default router;
