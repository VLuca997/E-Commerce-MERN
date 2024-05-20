import express from "express";
import {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentlyUserProfile,
    updateCurrentlyUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
//Dichiarzione router
const router = express.Router();


//CREATE user
router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);

//GetCurrently + UPDATE user
router
    .route("/profile")
    .get(authenticate, getCurrentlyUserProfile)//
    .put(authenticate, updateCurrentlyUserProfile);


//ROTTA ADMIN
router
    .route("/:id")
    .delete(authenticate, authorizeAdmin, deleteUserById)//delete by ID user Admin
    .get(authenticate, authorizeAdmin,getUserById)//Get user Admin by ID
    .put(authenticate,authorizeAdmin,updateUserById)//Update user Admin ( permette di modificare anche lo stato isAdmin)

//LOGIN E REGISTER
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);


export default router;
