import multer from "multer";

const storage = multer.memoryStorage();

const resumeFileFilter = (req, file, callback) => {
  if (file.mimetype !== "application/pdf") {
    return callback(
      new Error("Only PDF resume files are allowed"),
      false
    );
  }

  callback(null, true);
};

const resumeUpload = multer({
  storage,
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default resumeUpload;