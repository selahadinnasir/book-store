import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: {
             type: String, 
             required: true, 
             unique: true 
            },
        password: { 
            type: String,
             required: true
             },
        role: { 
            type: String,
             enum: ['entrepreneur', 'student', 'investor'],
              required: true,
             },
        profile: { type: String }, // For more details about the user (achievements, business ideas)
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User; // Use export default
