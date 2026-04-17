import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  dreamRole: {
    type: String,
    required: true,
  },
  resumeText: {
    type: String,
    default: '',
  },
  resumeUrl: {
    type: String,
    default: '',
  },
  linkedinUrl: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String],
    default: [],
  },
  healthScore: {
    type: Number,
    default: 75,
  },
}, {
  timestamps: true, // Automatically manages createdAt and updatedAt
});

// Since this is Next.js, we check if the model already exists to avoid overwriting error during hot reloads
export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema);
