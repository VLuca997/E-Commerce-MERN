import express from "express";
import formidable from "express-formidable";


//controllers
import { authenticate, authorizeAdmin } from "./../middlewares/authMiddleware.js";
// import checkId from './../checkId.js'
import { addProduct } from "../controllers/productController.js";


const router = express.Router()

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);

export default router;



