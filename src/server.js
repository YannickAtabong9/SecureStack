require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth'); // Import authentication routes

// Initialize Express
const app = express();
app.use(express.json()); // Middleware for parsing JSON requests

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/securestack';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in .env

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected...'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit on connection error
  });

// Swagger Documentation Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SecureStack API',
      version: '1.0.0',
      description: 'SecureStack API Documentation',
    },
  },
  apis: ['./routes/*.js'], // Swagger will scan all route files
};
const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'success', message: 'API is running!' });
});

// Authentication Routes
app.use('/api/v1/auth', authRoutes);

// Default Home Route
app.get("/", (req, res) => {
  res.send("Welcome to SecureStack API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

