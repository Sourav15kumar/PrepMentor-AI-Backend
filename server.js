import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://prep-mentor-ai-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(
  "/api/learning",
  learningRoutes
);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/resumes", resumeRoutes);
app.use(
  "/api/interviews",
  interviewRoutes
);

app.get("/", (req, res) => {
  res.send(
    "InterviewAI Backend Running..."
  );
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});