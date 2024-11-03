import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // ?
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fundingGoal: {
        type: Number,
        required: true,
    },
    fundsRaised: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Proposal = mongoose.model('Proposal', proposalSchema);
export default Proposal;

