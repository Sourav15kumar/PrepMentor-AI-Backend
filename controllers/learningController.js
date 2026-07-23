import learningContent from "../data/learning/index.js";

// ================= GET ALL SUBJECTS =================

export const getLearningSubjects = async (
  req,
  res
) => {
  try {
    const subjects = learningContent.map(
      (subject) => ({
        id: subject.id,
        title: subject.title,
        shortTitle: subject.shortTitle,
        category: subject.category,
        description: subject.description,
        estimatedHours:
          subject.estimatedHours,
        totalTopics:
          subject.topics.length,
      })
    );

    return res.status(200).json({
      success: true,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    console.error(
      "Get learning subjects error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch learning subjects",
    });
  }
};

// ================= GET ONE SUBJECT =================

export const getLearningSubjectById =
  async (req, res) => {
    try {
      const { subjectId } = req.params;

      const subject =
        learningContent.find(
          (currentSubject) =>
            currentSubject.id ===
            subjectId
        );

      if (!subject) {
        return res.status(404).json({
          success: false,
          message:
            "Learning subject not found",
        });
      }

      const subjectResponse = {
        id: subject.id,
        title: subject.title,
        shortTitle: subject.shortTitle,
        category: subject.category,
        description:
          subject.description,
        estimatedHours:
          subject.estimatedHours,
        totalTopics:
          subject.topics.length,
        resources: subject.resources,

        topics: subject.topics.map(
          (topic) => ({
            id: topic.id,
            title: topic.title,
            description:
              topic.description,
            difficulty:
              topic.difficulty,
            estimatedMinutes:
              topic.estimatedMinutes,
            resources:
              topic.resources || [],
          })
        ),
      };

      return res.status(200).json({
        success: true,
        subject: subjectResponse,
      });
    } catch (error) {
      console.error(
        "Get learning subject error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to fetch learning subject",
      });
    }
  };

// ================= GET TOPIC NOTES =================

export const getLearningTopic =
  async (req, res) => {
    try {
      const {
        subjectId,
        topicId,
      } = req.params;

      const subject =
        learningContent.find(
          (currentSubject) =>
            currentSubject.id ===
            subjectId
        );

      if (!subject) {
        return res.status(404).json({
          success: false,
          message:
            "Learning subject not found",
        });
      }

      const topic =
        subject.topics.find(
          (currentTopic) =>
            currentTopic.id === topicId
        );

      if (!topic) {
        return res.status(404).json({
          success: false,
          message:
            "Learning topic not found",
        });
      }

      return res.status(200).json({
        success: true,

        subject: {
          id: subject.id,
          title: subject.title,
          shortTitle:
            subject.shortTitle,
        },

        topic,
      });
    } catch (error) {
      console.error(
        "Get learning topic error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to fetch learning topic",
      });
    }
  };