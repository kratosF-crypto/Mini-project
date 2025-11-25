# Simple multi-container deployment is recommended via docker-compose for local testing.
FROM node:18-alpine
WORKDIR /app
COPY backend/ ./backend/
RUN cd backend && npm install --production
EXPOSE 5000
CMD ["node","backend/server.js"]
