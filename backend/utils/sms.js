const axios = require('axios');

async function sendSms(phone, message) {
  // Placeholder: integrate with Fast2SMS or Twilio
  if (!process.env.FAST2SMS_API_KEY) {
    console.log('FAST2SMS_API_KEY not set — SMS mocked:', phone, message);
    return { status: 'mocked' };
  }
  // Example Fast2SMS request (adapt as required)
  const resp = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
    route: 'v3',
    sender_id: 'TXTIND',
    message,
    numbers: phone
  }, {
    headers: { Authorization: process.env.FAST2SMS_API_KEY }
  });
  return resp.data;
}

module.exports = { sendSms };
