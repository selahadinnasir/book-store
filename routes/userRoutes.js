import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerUser, loginUser , getUserProfile, updateUserProfile } from '../controllers/userController.js';


const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Secure Routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
