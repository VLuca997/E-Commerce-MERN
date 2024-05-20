import express from "express";
import {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentlyUserProfile,
    updateCurrentlyUserProfile,
    deleteUserById
} from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);

router
    .route("/profile")
    .get(authenticate, getCurrentlyUserProfile)
    .put(authenticate, updateCurrentlyUserProfile);

router
    .route("/:id")
    .delete(authenticate, authorizeAdmin, deleteUserById);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);


export default router;
