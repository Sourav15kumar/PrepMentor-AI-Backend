import User from "../models/user.js";
import cloudinary from "../config/cloudinary.js";

const PROFILE_FIELDS = [
  "name",
  "bio",
  "college",
  "branch",
  "year",
  "skills",
  "targetCompany",
  "experience",
  "github",
  "linkedin",
];

// ================= GET PROFILE =================

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -profileImagePublicId"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= UPDATE PROFILE =================

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    PROFILE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    const safeUser = await User.findById(user._id).select(
      "-password -profileImagePublicId"
    );

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= UPLOAD PROFILE IMAGE =================

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Multer buffer ko Cloudinary-compatible data URI me convert karna
    const base64Image = req.file.buffer.toString("base64");

    const dataUri = `data:${req.file.mimetype};base64,${base64Image}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "interviewai/profile-images",
      resource_type: "image",
      transformation: [
        {
          width: 500,
          height: 500,
          crop: "fill",
          gravity: "face",
        },
        {
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    });

    // Purani Cloudinary image delete karo
    if (user.profileImagePublicId) {
      try {
        await cloudinary.uploader.destroy(
          user.profileImagePublicId
        );
      } catch (deleteError) {
        console.error(
          "Old profile image delete failed:",
          deleteError
        );
      }
    }

    user.profileImage = uploadResult.secure_url;
    user.profileImagePublicId = uploadResult.public_id;

    await user.save();

    const safeUser = await User.findById(user._id).select(
      "-password -profileImagePublicId"
    );

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Profile image upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Profile image upload failed",
    });
  }
};