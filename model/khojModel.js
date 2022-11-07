const mongoose = require("mongoose");
const payloadSchema = mongoose.Schema({
  input_values: {
    type: String,
    required: true,
  },
  timestamps: {
    timestamp: timestamps.createdAt,
  },
});
// Schemas
const khojSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  user_id: {
    type: String,
    required: true,
    unique,
  },
  payload: [payloadSchema],
});
const Khoj = mongoose.model("Khoj", khojSchema);

module.exports = Khoj;
