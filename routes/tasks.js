const express = require('express');
const Task = require('../models/tasks');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { text, status, dueDate } = req.body; // Added dueDate to the destructured properties

  const task = new Task({
    text,
    status: status || 'To Do',
    subtasks: [],
    dueDate: dueDate ? new Date(dueDate) : null // Convert due date string to Date
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing task
router.put('/:id', async (req, res) => {
  const { text, status, dueDate } = req.body; // Added dueDate to the destructured properties

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { text, status, dueDate: dueDate ? new Date(dueDate) : null }, // Update the due date as well
      { new: true, runValidators: true } // `new: true` returns the updated task
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a subtask to an existing task
router.post('/:id/subtasks', async (req, res) => {
  const { text } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const subtask = { text, completed: false };
    task.subtasks.push(subtask);

    const updatedTask = await task.save();
    res.status(201).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a specific subtask within a task
router.put('/:taskId/subtasks/:subtaskId', async (req, res) => {
  const { text, completed } = req.body;

  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) return res.status(404).json({ message: 'Subtask not found' });

    // Update subtask fields
    if (text) subtask.text = text;
    if (completed !== undefined) subtask.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a subtask
router.delete('/:taskId/subtasks/:subtaskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) return res.status(404).json({ message: 'Subtask not found' });

    subtask.remove();
    const updatedTask = await task.save();

    res.json(updatedTask);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
