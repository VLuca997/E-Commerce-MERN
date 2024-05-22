import express from 'express';
import { createCategory,updatedCategory,removeCategory } from '../controllers/categoryController.js'; // Assicurati di aggiungere .js
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'; // Aggiungi .js se necessario




const router = express.Router();

router.route('/').post(authenticate,authorizeAdmin,createCategory);
router.route("/:categoryId").put(authenticate,authorizeAdmin,updatedCategory)
router.route('/:categoryId').delete(authenticate,authorizeAdmin,removeCategory)

export default router;
