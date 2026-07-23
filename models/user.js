import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ================= AUTHENTICATION =================

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    // ================= PROFILE =================

    profileImage: {
      type: String,
      default: "",
    },

    profileImagePublicId: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    college: {
      type: String,
      default: "",
      trim: true,
    },

    branch: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    targetCompany: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: String,
      default: "Fresher",
      trim: true,
    },

    github: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;