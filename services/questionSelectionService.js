import interviewQuestions from "../data/interviewQuestions.js";

const shuffleArray = (items) => {
  const copiedItems = [...items];

  for (
    let currentIndex =
      copiedItems.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (currentIndex + 1)
    );

    [
      copiedItems[currentIndex],
      copiedItems[randomIndex],
    ] = [
      copiedItems[randomIndex],
      copiedItems[currentIndex],
    ];
  }

  return copiedItems;
};

export const selectInterviewQuestions = ({
  interviewType,
  subject,
  difficulty,
  totalQuestions,
}) => {
  const normalizedType =
    interviewType.toLowerCase().trim();

  const normalizedSubject =
    subject?.toLowerCase().trim() || "";

  const normalizedDifficulty =
    difficulty.toLowerCase().trim();

  let filteredQuestions =
    interviewQuestions.filter((question) => {
      if (
        question.difficulty !==
        normalizedDifficulty
      ) {
        return false;
      }

      if (normalizedType === "hr") {
        return question.type === "hr";
      }

      if (
        normalizedType === "technical" ||
        normalizedType === "subject"
      ) {
        return (
          question.subject ===
          normalizedSubject
        );
      }

      return false;
    });

  if (
    filteredQuestions.length <
    totalQuestions
  ) {
    throw new Error(
      `Only ${filteredQuestions.length} fallback questions are available for this selection`
    );
  }

  filteredQuestions =
    shuffleArray(filteredQuestions);

  return filteredQuestions
    .slice(0, totalQuestions)
    .map((question) => ({
      questionId: question.id,

      question: question.question,

      subject: question.subject,

      difficulty:
        question.difficulty,

      topic: question.subject,

      expectedKeywords:
        question.keywords,

      source: "question-bank",
    }));
};