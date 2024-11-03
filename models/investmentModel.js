import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
    // ?
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    proposal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
},
  { timestamps: true }
);

const Investment = mongoose.model('Investment', investmentSchema);
export default Investment;
