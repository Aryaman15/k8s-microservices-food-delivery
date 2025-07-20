# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment variables
ENV PORT=3000
ENV MONGO_URI=mongodb://127.0.0.1:27017/user-service
ENV JWT_SECRET=supersecretkey

# Expose service port
EXPOSE 3000

# Start the user service
CMD ["npm", "start"]
