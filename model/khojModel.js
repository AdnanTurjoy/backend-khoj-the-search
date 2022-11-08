const mongoose = require("mongoose");
const User = require("./UserModel");

// Schemas
const khojSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    required: true,
    default: "not found",
  },
  input_values: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});
const Khoj = mongoose.model("Khoj", khojSchema);

module.exports = Khoj;
