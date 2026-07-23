import { PDFParse } from "pdf-parse";

import cloudinary from "../config/cloudinary.js";
import Resume from "../models/Resume.js";

import {
  analyzeResumeText,
} from "../services/resumeAnalysisService.js";

// ================= CLOUDINARY HELPER =================

const uploadBufferToCloudinary = (
  fileBuffer,
  originalName
) => {
  return new Promise((resolve, reject) => {
    const cleanFileName = originalName
      .replace(/\.pdf$/i, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-");

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "interviewai/resumes",
          resource_type: "image",
          format: "pdf",
          public_id: `${Date.now()}-${cleanFileName}`,
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );

    uploadStream.end(fileBuffer);
  });
};

// ================= PDF TEXT EXTRACTION =================

const extractTextFromPdf = async (fileBuffer) => {
  let parser;

  try {
    parser = new PDFParse({
      data: fileBuffer,
    });

    const result = await parser.getText();

    return {
      text: result.text?.trim() || "",
      pageCount: result.total || 0,
    };
  } catch (error) {
    console.error(
      "PDF text extraction error:",
      error
    );

    return {
      text: "",
      pageCount: 0,
    };
  } finally {
    if (parser) {
      await parser.destroy();
    }
  }
};

// ================= UPLOAD RESUME =================

export const uploadResume = async (req, res) => {
  let uploadResult = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a PDF resume",
      });
    }

    // PDF ke buffer se text extract karo
    const extractionResult =
      await extractTextFromPdf(req.file.buffer);

    // Actual PDF Cloudinary par save karo
    uploadResult = await uploadBufferToCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    // File details aur extracted text MongoDB me save karo
    const resume = await Resume.create({
      user: req.user.id,
      originalName: req.file.originalname,
      fileUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      extractedText: extractionResult.text,
      pageCount: extractionResult.pageCount,
      status: "uploaded",
    });

    return res.status(201).json({
      success: true,
      message:
        extractionResult.text.length > 0
          ? "Resume uploaded and text extracted successfully"
          : "Resume uploaded, but readable text could not be extracted",
      resume,
      textExtracted:
        extractionResult.text.length > 0,
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    // Cloudinary upload ho gaya, MongoDB save fail hua,
    // to unused Cloudinary file remove karo
    if (uploadResult?.public_id) {
      try {
        await cloudinary.uploader.destroy(
          uploadResult.public_id,
          {
            resource_type: "image",
          }
        );
      } catch (cleanupError) {
        console.error(
          "Cloudinary cleanup failed:",
          cleanupError
        );
      }
    }

    return res.status(500).json({
      success: false,
      message: "Resume upload failed",
    });
  }
};

// ================= GET USER RESUMES =================

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    })
      .select("-cloudinaryPublicId")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    console.error("Get resumes error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch resumes",
    });
  }
};

// ================= ANALYZE RESUME =================

export const analyzeResume = async (req, res) => {
  let resume;

  try {
    resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).select("+extractedText");

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (
      !resume.extractedText ||
      resume.extractedText.trim().length < 50
    ) {
      return res.status(422).json({
        success: false,
        message:
          "Readable text was not found in this PDF. Please upload a text-based PDF resume.",
      });
    }

    resume.status = "analyzing";
    await resume.save();

    const analysisResult = analyzeResumeText(
      resume.extractedText
    );

    resume.analysis = analysisResult;
    resume.status = "completed";

    await resume.save();

    const safeResume = resume.toObject();

    delete safeResume.extractedText;
    delete safeResume.cloudinaryPublicId;

    return res.status(200).json({
      success: true,
      message: "Resume analysis completed",
      resume: safeResume,
      analysis: safeResume.analysis,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    if (resume) {
      resume.status = "failed";

      try {
        await resume.save();
      } catch (saveError) {
        console.error(
          "Unable to save failed status:",
          saveError
        );
      }
    }

    return res.status(500).json({
      success: false,
      message:
        error.message || "Resume analysis failed",
    });
  }
};

// ================= DELETE RESUME =================

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    await cloudinary.uploader.destroy(
      resume.cloudinaryPublicId,
      {
        resource_type: "image",
      }
    );

    await resume.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete resume",
    });
  }
};