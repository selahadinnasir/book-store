import Proposal from '../models/proposalModel.js';
import { proposalValidation } from '../validation/valiadtionSchema.js';

// Create a new proposal
const createProposal = async (req, res) => {
    // validation
    const { error } = proposalValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

    const { title, description, fundingGoal } = req.body;
try {
    const proposal = new Proposal({
        title,
        description,
        owner: req.user._id,
        fundingGoal,
    });

    const savedProposal = await proposal.save();
    res.status(201).json({ message: 'Proposal created successfully', savedProposal });
} catch (error) {
    res.status(500).json({ message: 'Failed to create proposal', error });
}
    
};

// Get all proposals
const getProposals = async (req, res) => {
    const proposals = await Proposal.find();
    res.json(proposals);
};

// Get a single proposal by ID
const getProposalById = async (req, res) => {
    const proposal = await Proposal.findById(req.params.id);
    if (proposal) {
        res.json(proposal);
    } else {
        res.status(404).json({ message: 'Proposal not found' });
    }
};

// Update a proposal
const updateProposal = async (req, res) => {
    const { title, description, fundingGoal } = req.body;

    const proposal = await Proposal.findById(req.params.id);
    if (proposal) {
       
        proposal.title = title || proposal.title;
        proposal.description = description || proposal.description;
        proposal.fundingGoal = fundingGoal || proposal.fundingGoal;
        const updatedProposal = await proposal.save();
        res.json(updatedProposal);
    } else {
        res.status(404).json({ message: 'Proposal not found' });
    }
};

// Delete a proposal
const deleteProposal = async (req, res) => {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);
    if (proposal) {
        res.json({ message: 'Proposal removed' });
    } else {
        res.status(404).json({ message: 'Proposal not found' });
    }
};


export { createProposal, getProposals, getProposalById, updateProposal, deleteProposal };
