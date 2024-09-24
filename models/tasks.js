const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    subtasks: [subtaskSchema],
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
