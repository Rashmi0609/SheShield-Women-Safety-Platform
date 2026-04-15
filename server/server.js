const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./database/db");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const incRoutes = require("./routes/incidentRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const chatRoutes = require("./routes/chatRoutes");
const contactRoutes = require("./routes/contactRoutes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/incidents", incRoutes);
app.use("/api/v1/emergency", emergencyRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/chats", chatRoutes);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
