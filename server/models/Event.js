import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  userId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);