import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.warn(
    "⚠️ GROQ_API_KEY is missing. Local question bank fallback will be used."
  );
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default groq;