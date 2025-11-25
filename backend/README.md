# Backend — Smart Helpdesk

## Quick start (local)

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

API endpoints:
- `POST /api/auth/request-otp` — request OTP (placeholder)
- `POST /api/auth/verify-otp` — verify OTP (placeholder)
- `POST /api/tickets` — create ticket
- `GET /api/tickets` — list tickets
- `POST /api/chatbot/webhook` — Dialogflow webhook

