const mongoose = require("mongoose");
const Khoj = require("./khojModel");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,

    default: "success",
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  payload: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Khoj",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
