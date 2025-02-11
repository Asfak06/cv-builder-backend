const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cvRoutes = require("./routes/cvRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));



// Routes

// Routes
app.use("/api", cvRoutes); // Prefix API routes with /api

app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;
