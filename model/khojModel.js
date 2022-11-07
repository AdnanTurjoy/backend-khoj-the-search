const mongoose = require("mongoose");

// Schemas
const khojSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: "not found",
  },

  payload: [
    {
      input_values: {
        type: String,
        required: true,
      },
      timestamp: {
        type: String,
        required: true,
      },
    },
  ],
});
const Khoj = mongoose.model("Khoj", khojSchema);

module.exports = Khoj;
