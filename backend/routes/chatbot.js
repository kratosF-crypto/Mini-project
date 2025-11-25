const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const KnowledgeBase = require('../models/KnowledgeBase');

// Dialogflow webhook
router.post('/webhook', async (req, res) => {
  try {
    const body = req.body;
    const intent = body.queryResult && body.queryResult.intent && body.queryResult.intent.displayName;
    const params = body.queryResult && body.queryResult.parameters;
    if (intent === 'create_ticket') {
      const title = params.title || 'IT Issue via Chatbot';
      const description = params.description || (body.queryResult.queryText || '');
      const department = params.department || 'IT';
      // creator info might be in originalDetectIntentRequest.payload
      const ticket = await Ticket.create({ title, description, department, priority: params.priority || 'medium' });
      return res.json({ fulfillmentText: `Ticket created with ID: ${ticket._id}. We'll get back to you soon.` });
    } else if (intent === 'ask_faq') {
      const q = body.queryResult.queryText || '';
      const kb = await KnowledgeBase.findOne({ question: { $regex: q, $options: 'i' } });
      if (kb) return res.json({ fulfillmentText: kb.answer });
      return res.json({ fulfillmentText: "I couldn't find an exact answer. Would you like me to create a ticket?" });
    }
    return res.json({ fulfillmentText: 'Sorry, could not process your request.' });
  } catch (err) {
    console.error(err);
    return res.json({ fulfillmentText: 'Server error' });
  }
});

module.exports = router;
