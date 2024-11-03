import mongoose from 'mongoose';

const { Schema } = mongoose;

const fundingApplicationSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming the User model is named 'User'
    required: true,
  },
  amountRequested: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], // Define the possible statuses
    default: 'pending',
  },
},
{ timestamps: true }

);



const FundingApplication = mongoose.model('FundingApplication', fundingApplicationSchema);

export default FundingApplication;
