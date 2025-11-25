const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Create ticket
router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    // In production, associate creator via auth middleware
    let creator = null;
    if (payload.creatorUsername) {
      creator = await User.findOne({ username: payload.creatorUsername });
      if (!creator) creator = await User.create({ username: payload.creatorUsername, email: payload.creatorUsername });
    }
    const ticket = await Ticket.create({
      title: payload.title,
      description: payload.description,
      category: payload.category,
      priority: payload.priority || 'medium',
      creator: creator ? creator._id : null,
      department: payload.department
    });
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// List tickets
router.get('/', async (req, res) => {
  const tickets = await Ticket.find().populate('creator').populate('assignee').sort({ createdAt: -1 }).limit(200);
  res.json(tickets);
});

module.exports = router;
