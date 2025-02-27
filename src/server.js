


require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
app.use(express.json()); // Middleware for parsing JSON requests

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/securestack';

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected...'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit on connection error
  });

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'success', message: 'API is running!' });
});

// Define a default route for "/"
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


