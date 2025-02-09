const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/User.js");
const groqRoutes = require("./routes/groqRoutes.js"); // Import the Groq API routes

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// skibidi middleware to parse the kai cenat JSON file (人◕ω◕)
app.use(express.json(), cors({ origin: "http://localhost:3001", credentials: true }));

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
    const {
      username, password, firstname, lastname, race, zipcode, hispanic, insurance, gender,
      cardiac_conditions, cancer_related_conditions, neurological_disorders, trauma_injury,
      respiratory_conditions, digestive_disorders, musculoskeletal_disorders, 
      endocrine_metabolic_disorders, delivery_neonatal_procedures, infectious_diseases, other_conditions,
      chest_pain, shortness_of_breath, fatigue, palpitations, nausea_vomiting, unexplained_weight_loss,
      pain, headaches, dizziness_vertigo, numbness_weakness_limbs, seizures, bruising, swelling_inflammation,
      restricted_movement, coughing, wheezing, chest_tightness, abdominal_pain, diarrhea, bloating_indigestion,
      joint_pain, muscle_stiffness, decreased_range_of_motion, unexplained_weight_changes, increased_thirst_urination,
      hot_cold_intolerance, preterm_labor, bleeding_pregnancy, high_blood_pressure, premature_rupture_membranes,
      fever, chills, insomnia, weight_loss_gain
    } = req.body;
    
    // Check required fields
    if (!username || !password || !firstname || !lastname || !race || !zipcode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = await User.create({ 
      username, password, firstname, lastname, race, zipcode, hispanic, insurance, gender,
      cardiac_conditions, cancer_related_conditions, neurological_disorders, trauma_injury,
      respiratory_conditions, digestive_disorders, musculoskeletal_disorders, 
      endocrine_metabolic_disorders, delivery_neonatal_procedures, infectious_diseases, other_conditions,
      chest_pain, shortness_of_breath, fatigue, palpitations, nausea_vomiting, unexplained_weight_loss,
      pain, headaches, dizziness_vertigo, numbness_weakness_limbs, seizures, bruising, swelling_inflammation,
      restricted_movement, coughing, wheezing, chest_tightness, abdominal_pain, diarrhea, bloating_indigestion,
      joint_pain, muscle_stiffness, decreased_range_of_motion, unexplained_weight_changes, increased_thirst_urination,
      hot_cold_intolerance, preterm_labor, bleeding_pregnancy, high_blood_pressure, premature_rupture_membranes,
      fever, chills, insomnia, weight_loss_gain
    });

    res.status(201).json({ message: "User created successfully!", user: newUser });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
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

// New Groq API Route (╯°□°）╯︵ ┻━┻)
app.use("/api/groq", groqRoutes); // Linking the Groq API route

// Add this route to your existing server.js
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        // If user doesn't exist or password doesn't match
        if (!user || user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        // If credentials are correct
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
                // Add any other user data you want to send to the frontend
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred during login"
        });
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

