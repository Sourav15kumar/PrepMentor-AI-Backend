import express from "express";

import {
  getInterviewById,
  getInterviewStats,
  getRecentInterviews,
  startInterview,
  submitInterviewAnswer,
} from "../controllers/interviewController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Start new interview
router.post(
  "/start",
  protect,
  startInterview
);

// Dashboard interview statistics
router.get(
  "/stats",
  protect,
  getInterviewStats
);

// Recent completed interviews
router.get(
  "/recent",
  protect,
  getRecentInterviews
);

// Submit current answer
router.post(
  "/:id/answer",
  protect,
  submitInterviewAnswer
);

// Get one interview session
router.get(
  "/:id",
  protect,
  getInterviewById
);

export default router;