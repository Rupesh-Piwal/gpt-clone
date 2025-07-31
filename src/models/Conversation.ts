
import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'New Chat' },
    memoryId: { type: String }, // for Mem0.ai integration
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);
