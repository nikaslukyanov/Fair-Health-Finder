require('dotenv').config();  // Add this at the top to ensure environment variables are loaded
const Groq = require("groq-sdk");

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not set in environment variables');
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to get chat completion from Groq API
async function getGroqChatCompletion(prompt) {
  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    return response;
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to fetch response from Groq API.");
  }
}

module.exports = {
  getGroqChatCompletion
};
