# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Set environment variables (overridden in Docker Compose or CLI)
ENV PORT=3002
ENV MONGO_URI=mongodb://localhost:27017/cart
ENV JWT_SECRET=supersecretkey

# Expose port
EXPOSE 3002

#
# Start the service
CMD ["npm", "start"]
