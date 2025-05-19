import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import {authenticateToken} from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/authRole.middleware.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:pid', getProductById);
router.post('/', authenticateToken, authorizeRole('admin'), createProduct);
router.put('/:pid', authenticateToken, authorizeRole('admin'), updateProduct);
router.delete('/:pid', authenticateToken, authorizeRole('admin'), deleteProduct);

export default router;