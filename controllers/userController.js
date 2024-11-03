import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import { registerValidation, loginValidation } from '../validation/valiadtionSchema.js';
// Register a new user
const registerUser = async (req, res) => {
// Validate the data
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
    
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({message:"User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user instance
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role
    });

    // Save the user to the database
    const savedUser = await user.save();

    if (savedUser) {
        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
            token: generateToken(savedUser._id),
        });
    } else {
        res.status(400).json({message:'Invalid user data'});
    }
};

// Login a user
const loginUser = async (req, res) => {
// validation
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json('Invalid email or password');
    }
};

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};



// Get user profile
const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user profile', error });
  }
};

// Update user profile
 const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findById(userId);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;

      if (password) {
        user.password = password; // Ensure bcrypt hashing in user model
      }

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user profile', error });
  }
};

export { registerUser, loginUser,getUserProfile,updateUserProfile };