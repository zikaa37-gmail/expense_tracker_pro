const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide your name"] },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
      default: 0,
    },
    reset_code: { type: Number },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
