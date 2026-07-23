const IMPORTANT_KEYWORDS = [
  "javascript",
  "react",
  "node.js",
  "nodejs",
  "express",
  "mongodb",
  "sql",
  "git",
  "github",
  "rest api",
  "api",
  "html",
  "css",
  "database",
  "deployment",
  "problem solving",
  "data structures",
  "algorithms",
];

const ACTION_VERBS = [
  "built",
  "developed",
  "created",
  "implemented",
  "designed",
  "improved",
  "optimized",
  "managed",
  "led",
  "integrated",
  "deployed",
  "automated",
  "achieved",
  "reduced",
  "increased",
  "solved",
];

const containsAny = (text, keywords) => {
  return keywords.some((keyword) =>
    text.includes(keyword.toLowerCase())
  );
};

const countMatches = (text, keywords) => {
  return keywords.filter((keyword) =>
    text.includes(keyword.toLowerCase())
  ).length;
};

const detectSections = (text) => {
  return {
    contact:
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text) ||
      /(\+91[\s-]?)?[6-9]\d{9}/.test(text),

    summary: containsAny(text, [
      "summary",
      "profile",
      "objective",
      "professional summary",
      "career objective",
    ]),

    education: containsAny(text, [
      "education",
      "academic",
      "b.tech",
      "bachelor",
      "university",
      "college",
    ]),

    skills: containsAny(text, [
      "skills",
      "technical skills",
      "technologies",
      "tech stack",
    ]),

    projects: containsAny(text, [
      "projects",
      "personal projects",
      "academic projects",
      "project experience",
    ]),

    experience: containsAny(text, [
      "experience",
      "internship",
      "work experience",
      "employment",
    ]),

    certifications: containsAny(text, [
      "certifications",
      "certificates",
      "achievements",
      "courses",
    ]),
  };
};

const calculateContactScore = (text) => {
  let score = 0;

  const hasEmail =
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text);

  const hasPhone =
    /(\+91[\s-]?)?[6-9]\d{9}/.test(text);

  const hasProfessionalLink = containsAny(text, [
    "linkedin.com",
    "github.com",
  ]);

  if (hasEmail) score += 5;
  if (hasPhone) score += 5;
  if (hasProfessionalLink) score += 5;

  return {
    score,
    hasEmail,
    hasPhone,
    hasProfessionalLink,
  };
};

const calculateSectionScore = (sections) => {
  const sectionWeights = {
    summary: 5,
    education: 7,
    skills: 7,
    projects: 8,
    experience: 8,
  };

  return Object.entries(sectionWeights).reduce(
    (total, [section, weight]) => {
      return total + (sections[section] ? weight : 0);
    },
    0
  );
};

const calculateContentScore = (text) => {
  let score = 0;

  const actionVerbCount = countMatches(
    text,
    ACTION_VERBS
  );

  const containsNumbers =
    /\b\d+(\.\d+)?%?\b/.test(text);

  const wordCount = text
    .split(/\s+/)
    .filter(Boolean).length;

  if (actionVerbCount >= 5) {
    score += 10;
  } else if (actionVerbCount >= 2) {
    score += 6;
  } else if (actionVerbCount >= 1) {
    score += 3;
  }

  if (containsNumbers) {
    score += 10;
  }

  if (wordCount >= 250 && wordCount <= 900) {
    score += 10;
  } else if (wordCount >= 150) {
    score += 6;
  } else if (wordCount > 0) {
    score += 3;
  }

  return {
    score,
    actionVerbCount,
    containsNumbers,
    wordCount,
  };
};

const calculateKeywordScore = (text) => {
  const foundKeywords = IMPORTANT_KEYWORDS.filter(
    (keyword) => text.includes(keyword)
  );

  const missingKeywords = IMPORTANT_KEYWORDS.filter(
    (keyword) => !text.includes(keyword)
  );

  const ratio =
    foundKeywords.length / IMPORTANT_KEYWORDS.length;

  const score = Math.round(ratio * 20);

  return {
    score: Math.min(score, 20),
    foundKeywords,
    missingKeywords,
  };
};

export const analyzeResumeText = (resumeText) => {
  if (
    !resumeText ||
    typeof resumeText !== "string" ||
    resumeText.trim().length < 50
  ) {
    throw new Error(
      "Resume text is empty or could not be extracted"
    );
  }

  const normalizedText = resumeText
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  const sectionsFound = detectSections(normalizedText);

  const contactResult =
    calculateContactScore(normalizedText);

  const sectionScore =
    calculateSectionScore(sectionsFound);

  const contentResult =
    calculateContentScore(normalizedText);

  const keywordResult =
    calculateKeywordScore(normalizedText);

  const atsScore = Math.min(
    contactResult.score +
      sectionScore +
      contentResult.score +
      keywordResult.score,
    100
  );

  const strengths = [];
  const improvements = [];

  // ================= STRENGTHS =================

  if (
    contactResult.hasEmail &&
    contactResult.hasPhone
  ) {
    strengths.push(
      "Contact information is clearly available."
    );
  }

  if (contactResult.hasProfessionalLink) {
    strengths.push(
      "Professional profile links are included."
    );
  }

  if (sectionsFound.skills) {
    strengths.push(
      "A dedicated technical skills section is present."
    );
  }

  if (sectionsFound.projects) {
    strengths.push(
      "Projects are included to demonstrate practical experience."
    );
  }

  if (sectionsFound.education) {
    strengths.push(
      "Education details are clearly mentioned."
    );
  }

  if (contentResult.actionVerbCount >= 3) {
    strengths.push(
      "Strong action verbs are used to describe work and projects."
    );
  }

  if (contentResult.containsNumbers) {
    strengths.push(
      "The resume includes measurable information or achievements."
    );
  }

  // ================= IMPROVEMENTS =================

  if (!contactResult.hasEmail) {
    improvements.push(
      "Add a professional email address."
    );
  }

  if (!contactResult.hasPhone) {
    improvements.push(
      "Add a valid contact number."
    );
  }

  if (!contactResult.hasProfessionalLink) {
    improvements.push(
      "Add LinkedIn or GitHub profile links."
    );
  }

  if (!sectionsFound.summary) {
    improvements.push(
      "Add a short professional summary or career objective."
    );
  }

  if (!sectionsFound.skills) {
    improvements.push(
      "Add a clearly labelled technical skills section."
    );
  }

  if (!sectionsFound.projects) {
    improvements.push(
      "Add a projects section with technologies and outcomes."
    );
  }

  if (!sectionsFound.experience) {
    improvements.push(
      "Add internship, training or relevant experience details."
    );
  }

  if (contentResult.actionVerbCount < 2) {
    improvements.push(
      "Use action verbs such as developed, implemented, built and improved."
    );
  }

  if (!contentResult.containsNumbers) {
    improvements.push(
      "Add measurable achievements such as percentages, counts or performance improvements."
    );
  }

  if (contentResult.wordCount < 150) {
    improvements.push(
      "Resume content is too short; add more relevant project and skill details."
    );
  }

  if (contentResult.wordCount > 900) {
    improvements.push(
      "Resume may be too long; remove unnecessary or repeated information."
    );
  }

  let summary = "";

  if (atsScore >= 80) {
    summary =
      "The resume has a strong baseline structure and contains most important ATS-friendly information.";
  } else if (atsScore >= 60) {
    summary =
      "The resume has a good foundation but needs improvements in structure, achievements or relevant keywords.";
  } else {
    summary =
      "The resume requires important improvements in sections, contact details, content quality and relevant keywords.";
  }

  return {
    atsScore,

    strengths:
      strengths.length > 0
        ? strengths
        : [
            "The resume was successfully parsed and analyzed.",
          ],

    improvements,

    // Frontend par bahut badi list nahi dikhayenge
    missingKeywords: keywordResult.missingKeywords.slice(
      0,
      10
    ),

    sectionsFound,

    scoreBreakdown: {
      contact: contactResult.score,
      sections: sectionScore,
      content: contentResult.score,
      keywords: keywordResult.score,
    },

    summary,

    analyzedAt: new Date(),
  };
};