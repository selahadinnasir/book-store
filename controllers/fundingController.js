// controllers/fundingController.js
import FundingApplication from '../models/fundingApplicationModel.js';
import { fundingApplicationValidation } from '../validation/valiadtionSchema.js';


// Apply for funding (Student only)
export const applyForFunding = async (req, res) => {
  // validation
  const { error } = fundingApplicationValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { amountRequested, reason } = req.body;
  const studentId = req.user._id;

  try {
    const application = new FundingApplication({
      studentId,
      amountRequested,
      reason,
      status: 'pending', // default status
    });

    const savedApplication = await application.save();
    res.status(201).json({ message: 'Funding application submitted', application });
  } catch (error) {
    res.status(500).json({ message: 'Failed to apply for funding application', error });
  }
};

// Get all funding applications for a student
export const getFundingApplications = async (req, res) => {
  const studentId = req.user._id; // Assuming req.user contains student details

  try {
    const applications = await FundingApplication.find({ studentId });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve funding applications', error });
  }
};
