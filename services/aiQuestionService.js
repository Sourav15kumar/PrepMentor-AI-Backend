import groq from "../config/groq.js";

const ALLOWED_TYPES = [
  "technical",
  "subject",
  "hr",
];

const ALLOWED_DIFFICULTIES = [
  "easy",
  "medium",
  "hard",
];

const buildQuestionPrompt = ({
  interviewType,
  subject,
  difficulty,
  totalQuestions,
}) => {
  const candidateLevel = "fresher or entry-level software candidate";

  if (interviewType === "hr") {
    return `
Generate exactly ${totalQuestions} HR interview questions for a ${candidateLevel}.

Requirements:
- Difficulty: ${difficulty}
- Questions must be realistic and useful in company interviews.
- Do not repeat questions.
- Keep every question clear and concise.
- expectedConcepts must contain 4 to 6 concepts that a good answer should cover.
- topic should describe the skill being tested.
`;
  }

  return `
Generate exactly ${totalQuestions} interview questions for a ${candidateLevel}.

Interview type: ${interviewType}
Subject: ${subject}
Difficulty: ${difficulty}

Requirements:
- Questions must belong only to ${subject}.
- Questions must match ${difficulty} difficulty.
- Do not repeat questions.
- Keep every question clear and suitable for an interview.
- expectedConcepts must contain 4 to 6 important concepts expected in a good answer.
- topic should identify the exact concept being tested.
`;
};

const validateGeneratedQuestions = (
  questions,
  totalQuestions
) => {
  if (!Array.isArray(questions)) {
    throw new Error(
      "AI response does not contain a questions array"
    );
  }

  if (questions.length !== totalQuestions) {
    throw new Error(
      `AI generated ${questions.length} questions instead of ${totalQuestions}`
    );
  }

  const validQuestions = questions.every(
    (question) =>
      typeof question.question === "string" &&
      question.question.trim().length >= 10 &&
      typeof question.topic === "string" &&
      question.topic.trim().length > 0 &&
      Array.isArray(question.expectedConcepts) &&
      question.expectedConcepts.length >= 2
  );

  if (!validQuestions) {
    throw new Error(
      "AI generated questions in an invalid format"
    );
  }
};

export const generateAIInterviewQuestions = async ({
  interviewType,
  subject,
  difficulty,
  totalQuestions,
}) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Groq API key is not configured");
  }

  if (!ALLOWED_TYPES.includes(interviewType)) {
    throw new Error("Invalid interview type");
  }

  if (
    !ALLOWED_DIFFICULTIES.includes(difficulty)
  ) {
    throw new Error("Invalid difficulty");
  }

  const prompt = buildQuestionPrompt({
    interviewType,
    subject,
    difficulty,
    totalQuestions,
  });

  const completion =
    await groq.chat.completions.create({
      model:
        process.env.GROQ_MODEL ||
        "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content:
            "You are an experienced technical and HR interviewer. Generate accurate, non-duplicate interview questions. Return only data matching the requested JSON schema.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.5,

      max_completion_tokens: 2500,

      response_format: {
        type: "json_schema",

        json_schema: {
          name: "interview_questions",

          strict: true,

          schema: {
            type: "object",

            additionalProperties: false,

            properties: {
              questions: {
                type: "array",

                minItems: totalQuestions,
                maxItems: totalQuestions,

                items: {
                  type: "object",

                  additionalProperties: false,

                  properties: {
                    question: {
                      type: "string",
                    },

                    topic: {
                      type: "string",
                    },

                    expectedConcepts: {
                      type: "array",

                      items: {
                        type: "string",
                      },
                    },
                  },

                  required: [
                    "question",
                    "topic",
                    "expectedConcepts",
                  ],
                },
              },
            },

            required: ["questions"],
          },
        },
      },
    });

  const responseContent =
    completion.choices?.[0]?.message?.content;

  if (!responseContent) {
    throw new Error(
      "Groq returned an empty response"
    );
  }

  let parsedResponse;

  try {
    parsedResponse = JSON.parse(responseContent);
  } catch {
    throw new Error(
      "Unable to parse Groq response"
    );
  }

  validateGeneratedQuestions(
    parsedResponse.questions,
    totalQuestions
  );

  return parsedResponse.questions.map(
    (question, index) => ({
      questionId: `ai-${Date.now()}-${index + 1}`,

      question: question.question.trim(),

      subject:
        interviewType === "hr"
          ? "hr"
          : subject,

      difficulty,

      expectedKeywords:
        question.expectedConcepts.map(
          (concept) =>
            concept.toLowerCase().trim()
        ),

      topic: question.topic.trim(),

      source: "ai",
    })
  );
};