// validationSchemas.js
import Joi from 'joi';

// Registration validation schema
export const registerValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'entrepreneur', 'investor').required()
});

// Login validation schema
export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});



// Funding application validation schema
export const fundingApplicationValidation = Joi.object({
    amountRequested: Joi.number().min(1).required(),
    reason: Joi.string().min(10).required(),
  });
  
// Proposal validation schema
export const proposalValidation = Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(20).required(),
    fundingGoal: Joi.number().min(1).required(),
  });
 
// Investment validation schema
export const investmentValidation = Joi.object({
    // investor: Joi.string().required(), // Typically set from req.user._id
    proposal: Joi.string().required(), // ID of the proposal being invested in
    amount: Joi.number().min(1).required(), // Investment amount must be greater than zero
});