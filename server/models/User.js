const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,  // Remove whitespace
      validate: {
        validator: function(v) {
          return v != null && v.length > 0;
        },
        message: 'Username cannot be null or empty'
      }
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    race: {
      type: String,
      required: true
    },
    hispanic: {
      type: String,  // Changed from Boolean to String
      required: true
    },
    zipcode: {
      type: Number,
      required: true
    },
    insurance: {
      type: String,  // Changed from Boolean to String
      required: true
    },
    gender: {
      type: String,
      required: true
    },

    // Disease Group Fields (as integers, default to 0)
    cardiac_conditions: { type: Number, default: 0 },
    cancer_related_conditions: { type: Number, default: 0 },
    neurological_disorders: { type: Number, default: 0 },
    trauma_injury: { type: Number, default: 0 },
    respiratory_conditions: { type: Number, default: 0 },
    digestive_disorders: { type: Number, default: 0 },
    musculoskeletal_disorders: { type: Number, default: 0 },
    endocrine_metabolic_disorders: { type: Number, default: 0 },
    delivery_neonatal_procedures: { type: Number, default: 0 },
    infectious_diseases: { type: Number, default: 0 },
    other_conditions: { type: Number, default: 0 },

    // Symptom Fields (as integers, default to 0)
    chest_pain: { type: Number, default: 0 },
    shortness_of_breath: { type: Number, default: 0 },
    fatigue: { type: Number, default: 0 },
    palpitations: { type: Number, default: 0 },
    nausea_vomiting: { type: Number, default: 0 },
    unexplained_weight_loss: { type: Number, default: 0 },
    pain: { type: Number, default: 0 },
    headaches: { type: Number, default: 0 },
    dizziness_vertigo: { type: Number, default: 0 },
    numbness_weakness_limbs: { type: Number, default: 0 },
    seizures: { type: Number, default: 0 },
    bruising: { type: Number, default: 0 },
    swelling_inflammation: { type: Number, default: 0 },
    restricted_movement: { type: Number, default: 0 },
    coughing: { type: Number, default: 0 },
    wheezing: { type: Number, default: 0 },
    chest_tightness: { type: Number, default: 0 },
    abdominal_pain: { type: Number, default: 0 },
    diarrhea: { type: Number, default: 0 },
    bloating_indigestion: { type: Number, default: 0 },
    joint_pain: { type: Number, default: 0 },
    muscle_stiffness: { type: Number, default: 0 },
    decreased_range_of_motion: { type: Number, default: 0 },
    unexplained_weight_changes: { type: Number, default: 0 },
    increased_thirst_urination: { type: Number, default: 0 },
    hot_cold_intolerance: { type: Number, default: 0 },
    preterm_labor: { type: Number, default: 0 },
    bleeding_pregnancy: { type: Number, default: 0 },
    high_blood_pressure: { type: Number, default: 0 },
    premature_rupture_membranes: { type: Number, default: 0 },
    fever: { type: Number, default: 0 },
    chills: { type: Number, default: 0 },
    insomnia: { type: Number, default: 0 },
    weight_loss_gain: { type: Number, default: 0 }

}, { collection: 'users', timestamps: true }); // Explicitly sets the collection name

// Create & export User model
const User = mongoose.model("User", userSchema);
module.exports = User;


