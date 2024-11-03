import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { getAllUsers, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

// Admin-Only Routes
router.get('/users', protect, authorize('admin'), getAllUsers);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

export default router;
