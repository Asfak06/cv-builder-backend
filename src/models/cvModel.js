const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // UUID of user
    templateId: { type: String, required: true }, // Selected template
    selectedIndustry:String, 
    personalDetails: {
      jobTitle: String,
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      city: String,
      country: String,
      profileImage: String,
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
    links: [
      {
        url:String,
        label:String,
      }
    ],
    references: [
      {
        name: String,
        position: String,
        company: String,
      },
    ],
    languages: [String],
    hobbies: [String],
    customSections: [
      {
        sectionTitle: String,  
        items: [
          {
            title: String,     
            description: String 
          }
        ]
      }
    ],
    isDeleted: { type: Boolean, default: false }, // Soft delete flag ✅
  },
  { timestamps: true } // Auto-add createdAt, updatedAt
);

module.exports = mongoose.model("CV", cvSchema);
