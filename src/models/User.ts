import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // Optional for OAuth users
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
