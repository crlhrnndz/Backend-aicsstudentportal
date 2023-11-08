const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    strand: { type: String },
    yearLevel: { type: String },
    section: { type: String },
    subjectName: { type: String },
    semester: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subject", subjectSchema);
