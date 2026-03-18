const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./database/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const incRoutes = require("./routes/incidentRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const chatRoutes = require('./routes/chatRoutes');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/incidents", incRoutes);
app.use("/api/v1/emergency", emergencyRoutes);
app.use('/api/v1/chats', chatRoutes);

// Error handler
app.use(errorHandler);

// Start server
const start = async () => {
  try {
    await connectDB(); // ✅ connect to MongoDB
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();