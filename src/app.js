const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path"); // Import path module
const cvRoutes = require("./routes/cvRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// 🆕 Serve static files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", cvRoutes); // Prefix API routes with /api

app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;
