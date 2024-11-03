import Investment from '../models/investmentModel.js';
import Proposal from '../models/proposalModel.js';
import { investmentValidation } from '../validation/valiadtionSchema.js';

// Create an investment
const createInvestment = async (req, res) => {
    // validation
    const { error } = investmentValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { proposalId, amount } = req.body;

    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
        return res.status(404).json({ message: 'Proposal not found' });
    }

    const investment = new Investment({
        investor: req.user._id,
        proposal: proposalId,
        amount,
    });

    // Update the funds raised on the proposal
    proposal.fundsRaised += amount;
    await proposal.save();

    const savedInvestment = await investment.save();
    res.status(201).json(savedInvestment);
};

// Get all investments
const getInvestments = async (req, res) => {
    
    const investments = await Investment.find().populate('proposal').populate('investor');
    res.json(investments);
};

export { createInvestment, getInvestments };
