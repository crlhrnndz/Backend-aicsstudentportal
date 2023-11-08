const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    sectionName: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("section", sectionSchema);
