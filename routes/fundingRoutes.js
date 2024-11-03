import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { applyForFunding, getFundingApplications } from '../controllers/fundingController.js';

const router = express.Router();

// Student-Only Routes
router.post('/apply', protect, authorize('student'), applyForFunding);
router.get('/applications', protect, authorize('student'), getFundingApplications);

export default router;
