# Use lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source
COPY . .

# Set default environment variables (can be overridden)
ENV PORT=3004
ENV MONGO_URI=mongodb://127.0.0.1:27017/payment-service

# Expose port
EXPOSE 3004

# Start dummy service
CMD ["node", "app.js"]
