const mongoose = require('mongoose');

// Subtask schema
const subtaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { _id: true });

// Task schema
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Task title
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' }, // Task status
  dueDate: { type: Date, required: false }, 
  subtasks: {
    type: [subtaskSchema],
    default: [],
    
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
