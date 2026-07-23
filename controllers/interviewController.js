import mongoose from "mongoose";

import Interview from "../models/Interview.js";

import {
  generateAIInterviewQuestions,
} from "../services/aiQuestionService.js";

import {
  selectInterviewQuestions,
} from "../services/questionSelectionService.js";

import {
  evaluateInterviewAnswer,
} from "../services/answerEvaluationService.js";

const ALLOWED_INTERVIEW_TYPES = [
  "technical",
  "hr",
  "subject",
];

const ALLOWED_DIFFICULTIES = [
  "easy",
  "medium",
  "hard",
];

const buildPublicQuestion = (
  question,
  questionNumber,
  totalQuestions
) => {
  return {
    questionId: question.questionId,
    question: question.question,
    topic: question.topic,
    subject: question.subject,
    difficulty: question.difficulty,
    source: question.source,
    questionNumber,
    totalQuestions,
  };
};

const getInterviewQuestions = async ({
  interviewType,
  subject,
  difficulty,
  totalQuestions,
}) => {
  try {
    const aiQuestions =
      await generateAIInterviewQuestions({
        interviewType,
        subject,
        difficulty,
        totalQuestions,
      });

    console.log(
      `✅ Groq generated ${aiQuestions.length} interview questions`
    );

    return {
      questions: aiQuestions,
      source: "ai",
    };
  } catch (aiError) {
    console.error(
      "⚠️ Groq question generation failed:",
      aiError.message
    );

    console.log(
      "🔄 Using local question bank fallback"
    );

    const fallbackQuestions =
      selectInterviewQuestions({
        interviewType,
        subject,
        difficulty,
        totalQuestions,
      });

    return {
      questions: fallbackQuestions,
      source: "question-bank",
    };
  }
};

// ================= START INTERVIEW =================

export const startInterview = async (req, res) => {
  try {
    const {
      interviewType,
      subject = "",
      difficulty = "easy",
      totalQuestions = 5,
    } = req.body;

    if (!interviewType) {
      return res.status(400).json({
        success: false,
        message: "Interview type is required",
      });
    }

    const normalizedType = String(interviewType)
      .toLowerCase()
      .trim();

    const normalizedSubject = String(subject)
      .toLowerCase()
      .trim();

    const normalizedDifficulty = String(difficulty)
      .toLowerCase()
      .trim();

    const parsedTotalQuestions =
      Number(totalQuestions);

    if (
      !ALLOWED_INTERVIEW_TYPES.includes(
        normalizedType
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview type",
      });
    }

    if (
      !ALLOWED_DIFFICULTIES.includes(
        normalizedDifficulty
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Difficulty must be easy, medium or hard",
      });
    }

    if (
      !Number.isInteger(parsedTotalQuestions) ||
      parsedTotalQuestions < 1 ||
      parsedTotalQuestions > 10
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Total questions must be between 1 and 10",
      });
    }

    if (
      normalizedType !== "hr" &&
      !normalizedSubject
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Subject is required for technical and subject interviews",
      });
    }

    const finalSubject =
      normalizedType === "hr"
        ? "hr"
        : normalizedSubject;

    const generationResult =
      await getInterviewQuestions({
        interviewType: normalizedType,
        subject: finalSubject,
        difficulty: normalizedDifficulty,
        totalQuestions: parsedTotalQuestions,
      });

    const interview = await Interview.create({
      user: req.user.id,
      interviewType: normalizedType,
      subject: finalSubject,
      difficulty: normalizedDifficulty,
      totalQuestions: parsedTotalQuestions,
      currentQuestionIndex: 0,
      questions: generationResult.questions,
      status: "in-progress",
      startedAt: new Date(),
    });

    const firstQuestion = interview.questions[0];

    return res.status(201).json({
      success: true,

      message:
        generationResult.source === "ai"
          ? "AI interview started successfully"
          : "Interview started using fallback questions",

      questionSource: generationResult.source,

      interview: {
        id: interview._id,
        interviewType: interview.interviewType,
        subject: interview.subject,
        difficulty: interview.difficulty,
        status: interview.status,
        totalQuestions: interview.totalQuestions,
        currentQuestionNumber: 1,
        startedAt: interview.startedAt,
      },

      question: buildPublicQuestion(
        firstQuestion,
        1,
        interview.totalQuestions
      ),
    });
  } catch (error) {
    console.error(
      "Start interview error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to start interview",
    });
  }
};


// ================= GET INTERVIEW STATS =================

export const getInterviewStats = async (req, res) => {
  try {
    const completedInterviews = await Interview.find({
      user: req.user.id,
      status: "completed",
    })
      .select(
        "averageScore totalScore totalQuestions completedAt"
      )
      .sort({
        completedAt: -1,
      });

    const totalInterviews =
      completedInterviews.length;

    let aiScore = null;
    let latestInterviewScore = null;

    if (totalInterviews > 0) {
      const totalAverageScore =
        completedInterviews.reduce(
          (sum, interview) =>
            sum +
            Number(interview.averageScore || 0),
          0
        );

      const overallAverageOutOfTen =
        totalAverageScore / totalInterviews;

      aiScore = Math.round(
        overallAverageOutOfTen * 10
      );

      latestInterviewScore = Math.round(
        Number(
          completedInterviews[0]
            .averageScore || 0
        ) * 10
      );
    }

    return res.status(200).json({
      success: true,

      stats: {
        totalInterviews,
        aiScore,
        latestInterviewScore,

        hasCompletedInterviews:
          totalInterviews > 0,
      },
    });
  } catch (error) {
    console.error(
      "Get interview stats error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch interview statistics",
    });
  }
};



// ================= GET RECENT INTERVIEWS =================

export const getRecentInterviews = async (
  req,
  res
) => {
  try {
    const requestedLimit = Number(
      req.query.limit
    );

    const limit =
      Number.isInteger(requestedLimit) &&
      requestedLimit > 0
        ? Math.min(requestedLimit, 10)
        : 5;

    const interviews =
      await Interview.find({
        user: req.user.id,
        status: "completed",
      })
        .select(
          `
            interviewType
            subject
            difficulty
            totalQuestions
            totalScore
            averageScore
            status
            startedAt
            completedAt
          `
        )
        .sort({
          completedAt: -1,
        })
        .limit(limit)
        .lean();

    const recentInterviews =
      interviews.map((interview) => {
        const averageScore = Number(
          interview.averageScore || 0
        );

        const percentage = Math.round(
          averageScore * 10
        );

        return {
          id: interview._id,

          interviewType:
            interview.interviewType,

          subject: interview.subject,

          difficulty:
            interview.difficulty,

          totalQuestions:
            interview.totalQuestions,

          averageScore,

          percentage,

          status: interview.status,

          startedAt:
            interview.startedAt,

          completedAt:
            interview.completedAt,
        };
      });

    return res.status(200).json({
      success: true,
      count: recentInterviews.length,
      interviews: recentInterviews,
    });
  } catch (error) {
    console.error(
      "Get recent interviews error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch recent interviews",
    });
  }
};




// ================= GET INTERVIEW =================

export const getInterviewById = async (
  req,
  res
) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const currentQuestion =
      interview.questions[
        interview.currentQuestionIndex
      ];

    return res.status(200).json({
      success: true,

      interview: {
        id: interview._id,
        interviewType: interview.interviewType,
        subject: interview.subject,
        difficulty: interview.difficulty,
        status: interview.status,
        totalQuestions: interview.totalQuestions,

        currentQuestionNumber:
          interview.status === "completed"
            ? interview.totalQuestions
            : interview.currentQuestionIndex + 1,

        totalScore: interview.totalScore,
        averageScore: interview.averageScore,
        strongConcepts:
          interview.strongConcepts,
        weakConcepts: interview.weakConcepts,
        startedAt: interview.startedAt,
        completedAt: interview.completedAt,
      },

      question:
        interview.status === "in-progress" &&
        currentQuestion
          ? buildPublicQuestion(
              currentQuestion,
              interview.currentQuestionIndex + 1,
              interview.totalQuestions
            )
          : null,
    });
  } catch (error) {
    console.error(
      "Get interview error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch interview",
    });
  }
};

// ================= SUBMIT ANSWER =================

export const submitInterviewAnswer = async (
  req,
  res
) => {
  try {
    const { answer } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    if (
      typeof answer !== "string" ||
      !answer.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Answer is required",
      });
    }

    const cleanedAnswer = answer.trim();

    if (cleanedAnswer.length < 10) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a more detailed answer",
      });
    }

    if (cleanedAnswer.length > 5000) {
      return res.status(400).json({
        success: false,
        message:
          "Answer cannot exceed 5000 characters",
      });
    }

    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).select("+questions.expectedKeywords");

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (interview.status !== "in-progress") {
      return res.status(400).json({
        success: false,
        message:
          "This interview is no longer in progress",
      });
    }

    const questionIndex =
      interview.currentQuestionIndex;

    const currentQuestion =
      interview.questions[questionIndex];

    if (!currentQuestion) {
      return res.status(400).json({
        success: false,
        message:
          "Current interview question was not found",
      });
    }

    if (
      currentQuestion.userAnswer ||
      currentQuestion.answeredAt
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This question has already been answered",
      });
    }

    const evaluation =
      await evaluateInterviewAnswer({
        interviewType:
          interview.interviewType,

        subject: interview.subject,

        difficulty:
          interview.difficulty,

        question:
          currentQuestion.question,

        topic:
          currentQuestion.topic,

        expectedConcepts:
          currentQuestion.expectedKeywords || [],

        userAnswer: cleanedAnswer,
      });

    currentQuestion.userAnswer =
      cleanedAnswer;

    currentQuestion.score =
      evaluation.score;

    currentQuestion.strengths =
      evaluation.strengths;

    currentQuestion.missingConcepts =
      evaluation.missingConcepts;

    currentQuestion.feedback =
      evaluation.feedback;

    currentQuestion.betterAnswer =
      evaluation.betterAnswer;

    currentQuestion.evaluationSource =
      evaluation.evaluationSource;

    currentQuestion.answeredAt =
      new Date();

    const answeredQuestionNumber =
      questionIndex + 1;

    interview.currentQuestionIndex += 1;

    const isLastQuestion =
      interview.currentQuestionIndex >=
      interview.totalQuestions;

    if (isLastQuestion) {
      const scoredQuestions =
        interview.questions.filter(
          (question) =>
            typeof question.score === "number"
        );

      const totalScore =
        scoredQuestions.reduce(
          (sum, question) =>
            sum + question.score,
          0
        );

      const averageScore =
        scoredQuestions.length > 0
          ? Number(
              (
                totalScore /
                scoredQuestions.length
              ).toFixed(1)
            )
          : 0;

      const strongConcepts = [
        ...new Set(
          scoredQuestions
            .filter(
              (question) =>
                question.score >= 7
            )
            .map(
              (question) =>
                question.topic ||
                question.subject
            )
        ),
      ];

      const weakConcepts = [
        ...new Set(
          scoredQuestions
            .filter(
              (question) =>
                question.score < 7
            )
            .map(
              (question) =>
                question.topic ||
                question.subject
            )
        ),
      ];

      interview.totalScore = totalScore;
      interview.averageScore =
        averageScore;
      interview.strongConcepts =
        strongConcepts;
      interview.weakConcepts =
        weakConcepts;
      interview.status = "completed";
      interview.completedAt = new Date();
    }

    await interview.save();

    const publicEvaluation = {
      questionNumber:
        answeredQuestionNumber,

      question:
        currentQuestion.question,

      userAnswer:
        currentQuestion.userAnswer,

      score:
        currentQuestion.score,

      outOf: 10,

      strengths:
        currentQuestion.strengths,

      missingConcepts:
        currentQuestion.missingConcepts,

      feedback:
        currentQuestion.feedback,

      betterAnswer:
        currentQuestion.betterAnswer,

      evaluationSource:
        currentQuestion.evaluationSource,
    };

    if (isLastQuestion) {
      return res.status(200).json({
        success: true,

        message:
          "Interview completed successfully",

        completed: true,

        evaluation:
          publicEvaluation,

        result: {
          interviewId:
            interview._id,

          status:
            interview.status,

          totalQuestions:
            interview.totalQuestions,

          totalScore:
            interview.totalScore,

          maximumScore:
            interview.totalQuestions * 10,

          averageScore:
            interview.averageScore,

          percentage:
            interview.totalQuestions > 0
              ? Math.round(
                  (interview.totalScore /
                    (interview.totalQuestions *
                      10)) *
                    100
                )
              : 0,

          strongConcepts:
            interview.strongConcepts,

          weakConcepts:
            interview.weakConcepts,

          completedAt:
            interview.completedAt,
        },

        nextQuestion: null,
      });
    }

    const nextQuestion =
      interview.questions[
        interview.currentQuestionIndex
      ];

    return res.status(200).json({
      success: true,

      message:
        "Answer evaluated successfully",

      completed: false,

      evaluation:
        publicEvaluation,

      progress: {
        answeredQuestions:
          interview.currentQuestionIndex,

        totalQuestions:
          interview.totalQuestions,

        remainingQuestions:
          interview.totalQuestions -
          interview.currentQuestionIndex,
      },

      nextQuestion:
        buildPublicQuestion(
          nextQuestion,
          interview.currentQuestionIndex + 1,
          interview.totalQuestions
        ),
    });
  } catch (error) {
    console.error(
      "Submit answer error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to evaluate answer",
    });
  }
};