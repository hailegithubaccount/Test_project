# Use Node.js 20 Alpine Linux image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# Expose port 5000
EXPOSE 5000

# Start Express REST API server
CMD ["node", "dist/server.js"]

