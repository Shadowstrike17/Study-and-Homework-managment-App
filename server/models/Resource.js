import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['book', 'video', 'pdf', 'link'], required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Resource', resourceSchema);