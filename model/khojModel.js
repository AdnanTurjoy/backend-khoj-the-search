const mongoose = require("mongoose");

// Schemas
const khojSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "not found",
    },

    input_values: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Khoj = mongoose.model("Khoj", khojSchema);

module.exports = Khoj;
