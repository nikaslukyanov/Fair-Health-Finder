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
async function getGroqChatCompletion(userId, prompt, userData) {
  try {
    // Get user's chat history
    let chatHistory = await ChatHistory.findOne({ userId });
    
    if (!chatHistory) {
      chatHistory = new ChatHistory({ userId, messages: [] });
    }

    // Safely create context with null checks
    const contextPrompt = `
User Context:
${userData ? `
- Name: ${userData.firstname || 'Unknown'} ${userData.lastname || ''}
- Gender: ${userData.gender || 'Unknown'}
- Medical Conditions: ${Object.entries(userData || {})
  .filter(([key, value]) => value === 1 && key.includes('_conditions'))
  .map(([key]) => key.replace('_conditions', '').replace('_', ' '))
  .join(', ') || 'None reported'}
- Symptoms: ${Object.entries(userData || {})
  .filter(([key, value]) => value === 1 && !key.includes('_conditions'))
  .map(([key]) => key.replace('_', ' '))
  .join(', ') || 'None reported'}` : 'No user data available'}

Previous conversation context:
${chatHistory.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User Question: ${prompt}

Please provide a helpful response based on this medical context.`;

    // Add user message to history
    const userMessage = {
      role: 'user',
      content: prompt,
      timestamp: new Date()
    };
    chatHistory.messages.push(userMessage);

    // Get response from Groq
    const response = await chain.call({
      input: contextPrompt
    });

    // Add assistant response to history
    const assistantMessage = {
      role: 'assistant',
      content: response.response,
      timestamp: new Date()
    };
    chatHistory.messages.push(assistantMessage);

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
    const chatHistory = await ChatHistory.findOne({ userId });
    return chatHistory ? chatHistory.messages : [];
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw new Error("Failed to fetch chat history");
  }
}

module.exports = {
  getGroqChatCompletion,
  getChatHistory
};
