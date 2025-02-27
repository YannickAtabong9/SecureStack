# Use official Node.js image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port your API runs on
EXPOSE 3000

# Command to start the API
CMD ["npm", "start"]
