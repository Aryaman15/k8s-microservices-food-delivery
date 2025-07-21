# Use official Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set default environment variables
ENV PORT=3001
ENV MONGO_URI=mongodb://localhost:27017/restaurant-service

# Expose port
EXPOSE 3001

# Start: seed DB then launch app
CMD ["npm", "run", "seed-and-start"]
