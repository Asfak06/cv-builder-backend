const CV = require("../models/cvModel");

// 1️⃣ Create or Update CV using _id
exports.createOrUpdateCV = async (req, res) => {
  const { cvId, userId, templateId, personalDetails, summary, experience, education, skills, references } = req.body;

  if (!userId || !templateId) {
    return res.status(400).json({ message: "User ID and Template ID are required" });
  }

  try {
    let cv;

    if (cvId) {
      // ✅ Update an existing CV by its unique _id
      cv = await CV.findOneAndUpdate(
        { _id: cvId, userId }, // Ensure it belongs to the user
        { templateId,personalDetails, summary, experience, education, skills, references,...req.body },
        { new: true } // Return updated document
      );

      if (!cv) {
        return res.status(404).json({ message: "CV not found or does not belong to the user" });
      }

      return res.status(200).json({ message: "CV updated successfully", cv });
    } else {
      // ✅ Create a new CV if cvId is not provided
      cv = new CV({ userId, templateId, selectedIndustry, personalDetails, summary, experience, education, skills, references,...req.body  });
      await cv.save();
      return res.status(201).json({ message: "CV created successfully", cv });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2️⃣ Fetch all active CV drafts for a user
exports.getAllUserCVs = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cvs = await CV.find({ userId, isDeleted: false }); // Exclude deleted CVs ✅
      res.status(200).json(cvs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

// 3️⃣ Fetch a specific CV by ID (Belongs to the requesting user)
exports.getUserCVById = async (req, res) => {
    const { cvId } = req.params;
    const { userId } = req.query; // Get userId from query params or authentication
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      const cv = await CV.findOne({ _id: cvId, userId });
  
      if (!cv) {
        return res.status(404).json({ message: "CV not found or does not belong to the user" });
      }
  
      res.status(200).json(cv);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };



  // 4️⃣ Soft Delete CV (Marks as deleted instead of removing it)
exports.deleteCV = async (req, res) => {
    const { cvId } = req.params;
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      const cv = await CV.findOneAndUpdate(
        { _id: cvId, userId, isDeleted: false }, // Ensure it's not already deleted
        { isDeleted: true },
        { new: true } // Return the updated document
      );
  
      if (!cv) {
        return res.status(404).json({ message: "CV not found or already deleted" });
      }
  
      res.status(200).json({ message: "CV soft deleted successfully", cv });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };