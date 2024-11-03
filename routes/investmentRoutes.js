import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { createInvestment, getInvestments } from '../controllers/investmentController.js';

const router = express.Router();

// Investor-Only Routes
router.post('/', protect, authorize('investor'), createInvestment);
router.get('/', protect, authorize('investor'), getInvestments);

export default router;
