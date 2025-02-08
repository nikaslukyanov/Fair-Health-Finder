const express = require('express');
const mongoose = require("mongoose");
const User = require("./models/User.js");
require("dotenv").config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;

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
    });

console.log('Initializing server...');

app.get('/', (req, res) => {
    console.log('Received request to /');
    res.send('Hello World!');
});

// BaaaaaaKKAKAA creating a new ₊✩‧₊˚౨ৎ b a b y g r o n k ౨ৎ˚₊✩‧₊ user (POST)
app.post("/users", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// heheh Get all meowsers (˵¯͒〰¯͒˵) (GET)
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// OMGGG now we're gonna update a user UWU (•ㅅ•) (PUT)
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully!", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// We deleting out here (=^･ω･^=) (DEL)
app.delete("/users/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Add error handling middleware (－_－) zzZ
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);
    res.status(500).send('Something broke!');
});

// HOUSTON WE ARE STARRRRTING the server (☝ ՞ਊ ՞)☝ 
const server = app.listen(3000, (error) => {
    if (error) {
        console.error('Error starting server:', error);
        return;
    }
    console.log('Server successfully started on port 3000');
});

// Gotta manage and handle da server errors HEHEHEHE (づ ◕‿◕ )づ
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error('Port 3000 is already in use');
    } else {
        console.error('Server error:', error);
    }
});
