const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User.js");

// --- Dummy Groq API Object ---
// Remove or replace this with your real Groq API client if available.
const groq = {
    chat: {
        completions: {
            create: async ({ messages, model }) => {
                // Simulate an API call delay if desired
                return {
                    choices: [
                        {
                            message: { content: "This is a dummy response from the Groq API." }
                        }
                    ]
                };
            }
        }
    }
};

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Check if MONGO_URI is provided
if (!MONGO_URI) {
    console.error("Error: MONGO_URI not set in environment variables.");
    process.exit(1);
}

// Middleware: Parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => {
        console.error("MongoDB connection error details:", {
            message: err.message,
            code: err.code,
            codeName: err.codeName
        });
        process.exit(1); // Exit if cannot connect to database
    });

console.log('Initializing server...');

// Root route
app.get('/', (req, res) => {
    console.log('Received request to /');
    res.status(200).json({ message: 'Hello World!' });
});

// Create a new user (POST)
app.post("/users", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newUser = await User.create({ username, email, password });
        res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users (GET)
app.get("/users", async (req, res) => {
    try {
        const users = await User.find().select('-password').lean();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user by ID (PUT)
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password').lean();

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully!", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user by ID (DELETE)
app.delete("/users/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Groq API route (POST)
app.post("/api/groq", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Missing prompt" });
        }

        // Call Groq API (or use the dummy function above)
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile", // Choose your preferred model
        });

        res.status(200).json({
            model: "Groq LLaMA-3.3 70B",
            response: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("Error calling Groq API:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start the server
const server = app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
    console.log(`Server successfully started on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});
