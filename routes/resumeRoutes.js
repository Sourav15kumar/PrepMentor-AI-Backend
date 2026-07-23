import express from "express";

import {
  uploadResume,
  getUserResumes,
  analyzeResume,
  deleteResume,
} from "../controllers/resumeController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import resumeUpload from "../middleware/resumeUploadMiddleware.js";

const router = express.Router();

// Upload new resume
router.post(
  "/",
  protect,
  resumeUpload.single("resume"),
  uploadResume
);

// Get current user's resumes
router.get(
  "/",
  protect,
  getUserResumes
);

// Analyze a specific resume
router.post(
  "/:id/analyze",
  protect,
  analyzeResume
);

// Delete a specific resume
router.delete(
  "/:id",
  protect,
  deleteResume
);

export default router;