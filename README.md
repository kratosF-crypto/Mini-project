# Smart Helpdesk — Full Production Project (Skeleton)

This repository contains a **production-ready skeleton** for the Smart Helpdesk Ticketing System:
- Frontend: React (create-react-app style) with a simple chatbot widget placeholder
- Backend: Node.js + Express + MongoDB (Mongoose)
- Dialogflow webhook endpoint for chatbot integration
- Email (Nodemailer) and SMS (placeholder) helpers
- Deployment helpers: `Dockerfile`, `docker-compose.yml`, `Procfile` (for Render/Heroku)

This skeleton is intended as a starting point you can extend to implement:
- OTP authentication
- Role-based access (user/technician/admin)
- Alert configuration & logs
- Full chatbot intents & knowledge base
- File attachments & storage (S3 or local)

## Quick notes

- Backend runs on port 5000 by default.
- Frontend runs on port 3000 (development) and proxies API requests to `/api`.
- Configure environment variables by copying `.env.example` -> `.env`.

See `/backend/README.md` and `/frontend/README.md` for next steps.
