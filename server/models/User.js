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
      type: Boolean,
      default: null
    },
    zipcode: {
      type: Number,
      required: true
    },
    insurance: {
      type: Boolean,
      default: null
    },
    gender: {
      type: String,
      default: null
    },

    // Disease Group Fields (as integers, required)
    cardiac_conditions: { type: Number, required: true },
    cancer_related_conditions: { type: Number, required: true },
    neurological_disorders: { type: Number, required: true },
    trauma_injury: { type: Number, required: true },
    respiratory_conditions: { type: Number, required: true },
    digestive_disorders: { type: Number, required: true },
    musculoskeletal_disorders: { type: Number, required: true },
    endocrine_metabolic_disorders: { type: Number, required: true },
    delivery_neonatal_procedures: { type: Number, required: true },
    infectious_diseases: { type: Number, required: true },
    other_conditions: { type: Number, required: true },

    // Symptom Fields (as integers, required)
    chest_pain: { type: Number, required: true },
    shortness_of_breath: { type: Number, required: true },
    fatigue: { type: Number, required: true },
    palpitations: { type: Number, required: true },
    nausea_vomiting: { type: Number, required: true },
    unexplained_weight_loss: { type: Number, required: true },
    pain: { type: Number, required: true },
    headaches: { type: Number, required: true },
    dizziness_vertigo: { type: Number, required: true },
    numbness_weakness_limbs: { type: Number, required: true },
    seizures: { type: Number, required: true },
    bruising: { type: Number, required: true },
    swelling_inflammation: { type: Number, required: true },
    restricted_movement: { type: Number, required: true },
    coughing: { type: Number, required: true },
    wheezing: { type: Number, required: true },
    chest_tightness: { type: Number, required: true },
    abdominal_pain: { type: Number, required: true },
    diarrhea: { type: Number, required: true },
    bloating_indigestion: { type: Number, required: true },
    joint_pain: { type: Number, required: true },
    muscle_stiffness: { type: Number, required: true },
    decreased_range_of_motion: { type: Number, required: true },
    unexplained_weight_changes: { type: Number, required: true },
    increased_thirst_urination: { type: Number, required: true },
    hot_cold_intolerance: { type: Number, required: true },
    preterm_labor: { type: Number, required: true },
    bleeding_pregnancy: { type: Number, required: true },
    high_blood_pressure: { type: Number, required: true },
    premature_rupture_membranes: { type: Number, required: true },
    fever: { type: Number, required: true },
    chills: { type: Number, required: true },
    insomnia: { type: Number, required: true },
    weight_loss_gain: { type: Number, required: true }

}, { collection: 'users', timestamps: true }); // Explicitly sets the collection name

// Create & export User model
const User = mongoose.model("User", userSchema);
module.exports = User;


