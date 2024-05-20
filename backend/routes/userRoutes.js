import express from "express";
import { createUser, loginUser, logoutCurrentUser, getAllUsers} from '../controllers/userController.js';

import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";

//ROUTER
const router = express.Router();

router.route("/").post(createUser).get(authenticate,authorizeAdmin,getAllUsers);


router.post("/auth", loginUser);//LOGIN
router.post("/logout", logoutCurrentUser);//LOGOUT

export default router;
