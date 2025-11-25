const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  priority: { type: String, enum: ['low','medium','high','critical'], default: 'medium' },
  status: { type: String, enum: ['open','in_progress','resolved','closed'], default: 'open' },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  assignee: { type: Schema.Types.ObjectId, ref: 'User' },
  department: String,
  attachments: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  slaDeadline: Date
});

module.exports = mongoose.model('Ticket', ticketSchema);
