const express = require("express");
const { getGroqChatCompletion, getChatHistory } = require("../services/groqService.js");

const router = express.Router();

// POST request to call Groq API
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.body.userId; // Make sure to send userId from frontend

    if (!prompt || !userId) {
      return res.status(400).json({ error: "Missing prompt or userId" });
    }

    const response = await getGroqChatCompletion(userId, prompt);
    
    res.status(200).json({
      model: "Groq LLaMA-3.3 70B",
      prompt,
      response: response.response,
      history: response.history
    });

  } catch (error) {
    console.error("Error in /api/groq route:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// GET request to fetch chat history
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await getChatHistory(userId);
    res.status(200).json({ history });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

module.exports = router;
