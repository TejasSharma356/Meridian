import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({ id: Number, role: String, company: String, period: String }, { _id: false });
const EducationSchema = new mongoose.Schema({ id: Number, institution: String, degree: String, year: String }, { _id: false });
const ProjectSchema = new mongoose.Schema({ id: Number, name: String, description: String }, { _id: false });
const CustomSectionItemSchema = new mongoose.Schema({ id: Number, title: String, subtitle: String, content: String }, { _id: false });
const CustomSectionSchema = new mongoose.Schema({ id: Number, title: String, items: [CustomSectionItemSchema] }, { _id: false });

const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  summary: { type: String, default: '' },
  skills: { type: String, default: '' },
  experience: { type: [ExperienceSchema], default: [] },
  education: { type: [EducationSchema], default: [] },
  projects: { type: [ProjectSchema], default: [] },
  customSections: { type: [CustomSectionSchema], default: [] }
}, {
  timestamps: true,
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
