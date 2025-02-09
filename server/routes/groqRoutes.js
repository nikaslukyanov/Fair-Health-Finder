const express = require("express");
const { getGroqChatCompletion } = require("../services/groqService.js");

const router = express.Router();

// POST request to call Groq API
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await getGroqChatCompletion(prompt);
    
    res.status(200).json({
      model: "Groq LLaMA-3.3 70B",
      prompt,
      response: response.choices[0]?.message?.content,
    });

  } catch (error) {
    console.error("Error in /api/groq route:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

module.exports = router;
