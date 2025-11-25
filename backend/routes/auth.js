const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// NOTE: This is a placeholder OTP implementation for demo purposes only.
// In production use rate limiting, hashed storage, expiry checks and SMS/email provider.

const otpStore = {}; // in-memory store: { identifier: { code, expiry } }

router.post('/request-otp', (req, res) => {
  const { phone_or_email } = req.body;
  if (!phone_or_email) return res.status(400).json({ error: 'phone_or_email required' });
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 10*60*1000;
  otpStore[phone_or_email] = { code, expiry };
  console.log('OTP for', phone_or_email, code);
  // TODO: send SMS/email via provider
  res.json({ message: 'OTP sent (check server logs in demo)' });
});

router.post('/verify-otp', (req, res) => {
  const { phone_or_email, code } = req.body;
  if (!phone_or_email || !code) return res.status(400).json({ error: 'phone_or_email & code required' });
  const record = otpStore[phone_or_email];
  if (!record || record.code !== code) return res.status(400).json({ error: 'Invalid OTP' });
  if (Date.now() > record.expiry) return res.status(400).json({ error: 'OTP expired' });
  delete otpStore[phone_or_email];
  // For demo, return a simple user object. Integrate JWT in production.
  return res.json({ message: 'verified', user: { username: phone_or_email }});
});

module.exports = router;
