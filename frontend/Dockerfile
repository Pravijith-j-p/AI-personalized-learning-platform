# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "start"]
