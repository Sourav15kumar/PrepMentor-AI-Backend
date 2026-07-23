import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    topic: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      type: String,
      enum: ["ai", "question-bank"],
      default: "question-bank",
    },

    expectedKeywords: {
      type: [String],
      default: [],
      select: false,
    },

    userAnswer: {
      type: String,
      default: "",
      trim: true,
    },

    score: {
      type: Number,
      min: 0,
      max: 10,
      default: null,
    },

    strengths: {
      type: [String],
      default: [],
    },

    missingConcepts: {
      type: [String],
      default: [],
    },

    feedback: {
      type: String,
      default: "",
    },

    betterAnswer: {
      type: String,
      default: "",
    },

    evaluationSource: {
      type: String,
      enum: ["ai", "keyword-fallback", "not-evaluated"],
      default: "not-evaluated",
    },

    answeredAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    interviewType: {
      type: String,
      enum: ["technical", "hr", "subject", "resume"],
      required: true,
    },

    subject: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    totalQuestions: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },

    currentQuestionIndex: {
      type: Number,
      default: 0,
    },

    questions: {
      type: [interviewQuestionSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["in-progress", "completed", "abandoned"],
      default: "in-progress",
    },

    totalScore: {
      type: Number,
      min: 0,
      default: 0,
    },

    averageScore: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    strongConcepts: {
      type: [String],
      default: [],
    },

    weakConcepts: {
      type: [String],
      default: [],
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;