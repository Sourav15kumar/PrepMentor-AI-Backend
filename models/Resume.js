import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    // Resume kis user ka hai
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    mimeType: {
      type: String,
      default: "application/pdf",
    },

    // PDF ke andar se nikala gaya text
    extractedText: {
      type: String,
      default: "",
      select: false,
    },

    pageCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["uploaded", "analyzing", "completed", "failed"],
      default: "uploaded",
    },

    analysis: {
      atsScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
      },

      strengths: {
        type: [String],
        default: [],
      },

      improvements: {
        type: [String],
        default: [],
      },

      missingKeywords: {
        type: [String],
        default: [],
      },

      sectionsFound: {
        contact: {
          type: Boolean,
          default: false,
        },

        summary: {
          type: Boolean,
          default: false,
        },

        education: {
          type: Boolean,
          default: false,
        },

        skills: {
          type: Boolean,
          default: false,
        },

        projects: {
          type: Boolean,
          default: false,
        },

        experience: {
          type: Boolean,
          default: false,
        },

        certifications: {
          type: Boolean,
          default: false,
        },
      },

      scoreBreakdown: {
        contact: {
          type: Number,
          default: 0,
        },

        sections: {
          type: Number,
          default: 0,
        },

        content: {
          type: Number,
          default: 0,
        },

        keywords: {
          type: Number,
          default: 0,
        },
      },

      summary: {
        type: String,
        default: "",
      },

      analyzedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;