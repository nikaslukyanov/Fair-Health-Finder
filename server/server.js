const express = require('express');
const mongoose = require("mongoose");
const User = require("./models/User.js");
require("dotenv").config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// skibidi middleware to parse the kai cenat JSON file (人◕ω◕)
app.use(express.json());

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

app.get('/', (req, res) => {
    console.log('Received request to /');
    res.status(200).json({ message: 'Hello World!' });
});

// BaaaaaaKKAKAA creating a new ₊✩‧₊˚౨ৎ b a b y g r o n k ౨ৎ˚₊✩‧₊ user (POST)
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

// heheh Get all meowsers (˵¯͒〰¯͒˵) (GET)
app.get("/users", async (req, res) => {
    try {
        const users = await User.find().select('-password').lean();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// OMGGG now we're gonna update a user UWU (•ㅅ•) (PUT)
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

// We deleting out here (=^･ω･^=) (DEL)
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

// Add error handling middleware (－_－) zzZ
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// HOUSTON WE ARE STARRRRTING the server (☝ ՞ਊ ՞)☝ 
const server = app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
    console.log(`Server successfully started on port ${PORT}`);
});

// Gotta manage and handle da server errors HEHEHEHE (づ ◕‿◕ )づ
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});
