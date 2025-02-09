require('dotenv').config();  // Add this at the top to ensure environment variables are loaded
const { ChatGroq } = require("@langchain/groq");
const { ConversationChain } = require("langchain/chains");
const { BufferMemory } = require("langchain/memory");
const ChatHistory = require("../models/ChatHistory");

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not set in environment variables');
}

// Initialize Groq with LangChain
const chat = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0.7,
});

// Initialize conversation memory
const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: "history",
});

// Initialize conversation chain
const chain = new ConversationChain({
  llm: chat,
  memory: memory,
});

// Function to get chat completion from Groq API
async function getGroqChatCompletion(userId, prompt) {
  try {
    // Get user's chat history
    let chatHistory = await ChatHistory.findOne({ userId });
    
    if (!chatHistory) {
      chatHistory = new ChatHistory({ userId, messages: [] });
    }

    // Add user message to history
    chatHistory.messages.push({
      role: 'user',
      content: prompt
    });

    // Get response from Groq
    const response = await chain.call({
      input: prompt
    });

    // Add assistant response to history
    chatHistory.messages.push({
      role: 'assistant',
      content: response.response
    });

    // Save chat history
    await chatHistory.save();

    return {
      response: response.response,
      history: chatHistory.messages
    };
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to fetch response from Groq API.");
  }
}

async function getChatHistory(userId) {
  try {
    if (!userId) {
      throw new Error("userId is required");
    }
    const history = await ChatHistory.findOne({ userId });
    return history ? history.messages : [];
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw new Error("Failed to fetch chat history");
  }
}

module.exports = {
  getGroqChatCompletion,
  getChatHistory
};
