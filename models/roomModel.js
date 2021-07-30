const mongoose = require("mongoose");

let roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Room name must have at least 3 characters"],
      unique: true,
    },
    status: {
      type: Number,
      min: [1, "Status is at least 1"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
