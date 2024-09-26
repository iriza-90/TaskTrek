// routes/profile.js

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Get user profile (requires authentication)
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.put('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
