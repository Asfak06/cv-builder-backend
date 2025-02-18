require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
