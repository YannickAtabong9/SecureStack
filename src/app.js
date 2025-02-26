const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDB = require("../config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable CORS
app.use(express.json()); // Parse JSON request body

// Import routes correctly
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

// Use routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Default Route
app.get("/", (req, res) => {
    res.json({ message: "🚀 SecureStack API is running!" });
});

module.exports = app;

