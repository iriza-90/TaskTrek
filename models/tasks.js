const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { _id: true });

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  subtasks: [subtaskSchema],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;