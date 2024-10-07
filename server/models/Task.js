import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['todo', 'inProgress', 'done'], default: 'todo' },
  userId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);