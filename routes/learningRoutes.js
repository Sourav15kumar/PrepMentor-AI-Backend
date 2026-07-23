import express from "express";

import {
  getLearningSubjects,
  getLearningSubjectById,
  getLearningTopic,
} from "../controllers/learningController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all subjects
router.get(
  "/subjects",
  protect,
  getLearningSubjects
);

// Get one topic with complete notes
router.get(
  "/subjects/:subjectId/topics/:topicId",
  protect,
  getLearningTopic
);

// Get one subject with its topic list
router.get(
  "/subjects/:subjectId",
  protect,
  getLearningSubjectById
);

export default router;