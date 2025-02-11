const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // UUID of user
    templateId: { type: String, required: true }, // Selected template
    personalDetails: {
      jobTitle: String,
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      city: String,
      country: String,
    },
    summary: String,
    experience: [
      {
        jobTitle: String,
        company: String,
        startDate: String,
        endDate: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
    skills: [String],
    references: [
      {
        name: String,
        position: String,
        company: String,
      },
    ],
    isDeleted: { type: Boolean, default: false }, // Soft delete flag ✅
  },
  { timestamps: true } // Auto-add createdAt, updatedAt
);

module.exports = mongoose.model("CV", cvSchema);
