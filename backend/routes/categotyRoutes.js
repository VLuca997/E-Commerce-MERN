import express from 'express';
import { createCategory,updatedCategory,removeCategory,listCategory,readCategory } from '../controllers/categoryController.js'; // Assicurati di aggiungere .js
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'; // Aggiungi .js se necessario




const router = express.Router();

router.route('/').post(authenticate,authorizeAdmin,createCategory);
router.route("/:categoryId").put(authenticate,authorizeAdmin,updatedCategory)//modifica
router.route('/:categoryId').delete(authenticate,authorizeAdmin,removeCategory)//elimina
router.route('/categories').get(listCategory)//show all
router.route('/:id').get(readCategory)//single show
export default router;
