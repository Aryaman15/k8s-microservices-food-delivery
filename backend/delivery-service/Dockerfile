# Use official Node.js LTS base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Set environment variables (can be overridden in docker-compose or elsewhere)
ENV PORT=3005
ENV MONGO_URI=mongodb://localhost:27017/delivery-service
ENV JWT_SECRET=supersecretkey
ENV ORDER_SERVICE_URL=http://order-service:3003

# Expose the port the app runs on
EXPOSE 3005

# Start the application
CMD ["npm", "start"]
