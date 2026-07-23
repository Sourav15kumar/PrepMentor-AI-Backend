import express from "express";

import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Current logged-in user profile
router.get("/profile", protect, getUserProfile);

// Update text profile fields
router.put("/profile", protect, updateUserProfile);

// Upload or replace profile image
router.put(
  "/profile/image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

export default router;