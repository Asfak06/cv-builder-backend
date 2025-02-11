const express = require("express");
const { createOrUpdateCV, getAllUserCVs, getUserCVById,deleteCV} = require("../controllers/cvController");

const router = express.Router();

// ✅ Save or update CV
router.post("/cv", createOrUpdateCV);

// ✅ Get all saved CVs for a user
router.get("/cv/user/:userId", getAllUserCVs);

// ✅ Get individual CV by ID
router.get("/cv/:cvId", getUserCVById);

// ✅ Soft Delete a CV
router.delete("/cv/:cvId", deleteCV);

module.exports = router;
