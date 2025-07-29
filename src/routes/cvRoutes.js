const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { createOrUpdateCV, getAllUserCVs, getUserCVById,deleteCV} = require("../controllers/cvController");

const router = express.Router();

// Define upload directory
const uploadDir = path.join(__dirname, "../uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    // Extract file extension from originalname or default to .png for blobs
    const fileExtension = path.extname(file.originalname) || '.png';
    const baseName = path.basename(file.originalname, fileExtension);
    const fileName = `${Date.now()}-${baseName}${fileExtension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// 🆕 Image Upload Route
router.post("/upload-image", upload.single("profileImage"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    res.status(200).json({ 
      message: "Image uploaded successfully",
      imageUrl: `/uploads/${req.file.filename}`,
      filename: req.file.filename
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
});

// ✅ Save or update CV
router.post("/cv", createOrUpdateCV);

// ✅ Get all saved CVs for a user
router.get("/cv/user/:userId", getAllUserCVs);

// ✅ Get individual CV by ID
router.get("/cv/:cvId", getUserCVById);

// ✅ Soft Delete a CV
router.delete("/cv/:cvId", deleteCV);

module.exports = router;
