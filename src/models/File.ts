
import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cloudinaryId: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true }, 
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
  },
  { timestamps: { createdAt: 'uploadedAt' } }
);

export default mongoose.models.File || mongoose.model('File', FileSchema);
