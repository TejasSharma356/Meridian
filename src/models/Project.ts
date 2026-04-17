import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['IN PROGRESS', 'REVIEW', 'PLANNING', 'COMPLETED'],
    default: 'IN PROGRESS',
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  techStack: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
