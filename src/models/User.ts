
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    preferences: {
      theme: { type: String, default: 'light' },
      language: { type: String, default: 'en' },
      memoryEnabled: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
