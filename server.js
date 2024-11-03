import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Note the .js extension
import userRoutes from './routes/userRoutes.js'; // Note the .js extension
import proposalRoutes from './routes/proposalRoutes.js';
import investmentRoutes from './routes/investmentRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import fundingRoutes from './routes/fundingRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js';
// import bcrypt from 'bcryptjs'; 

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json()); // Parse JSON data

// User routes
app.use('/api/users', userRoutes);
app.use('/api/admin',adminRoutes );
app.use('/api/funding',fundingRoutes)

// proposal and invetsment route

app.use('/api/proposals', proposalRoutes);
app.use('/api/investments', investmentRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Place this at the end, after defining routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    
// to change password to hash

//  const salt = await bcrypt.genSalt(10);
    //  const hashedPassword = await bcrypt.hash("admin123", salt);
    //  console.log(hashedPassword);