import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { createProposal, getProposals, updateProposal, deleteProposal } from '../controllers/proposalController.js';

const router = express.Router();

// Entrepreneur-Only Routes
router.post('/', protect, authorize('entrepreneur'), createProposal);
router.get('/', protect, authorize('entrepreneur'), getProposals);
router.put('/:id', protect, authorize('entrepreneur'), updateProposal);
router.delete('/:id', protect, authorize('entrepreneur'), deleteProposal);

export default router;



