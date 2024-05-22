import express from "express";
import formidable from "express-formidable";


//controllers
import { authenticate, authorizeAdmin, } from "./../middlewares/authMiddleware.js";
// import checkId from './../checkId.js'
import { addProduct,updateProductDetails, removeProduct} from "../controllers/productController.js";


const router = express.Router()

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);
router.route("/:id").put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
router.route("/:id").delete(authenticate, authorizeAdmin, removeProduct)
export default router;



