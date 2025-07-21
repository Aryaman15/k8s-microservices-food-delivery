# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Set environment variables (can be overridden by docker-compose or Kubernetes)
ENV PORT=3003
ENV MONGO_URI=mongodb://127.0.0.1:27017/order-service
ENV JWT_SECRET=supersecretkey
ENV RESTAURANT_SERVICE_URL=http://restaurant-service:3001
ENV DELIVERY_SERVICE_URL=http://delivery-service:3005

# Expose the port your service will run on
EXPOSE 3003

# Start the service
CMD ["npm", "start"]
