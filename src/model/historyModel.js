const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    adminFirstName: { type: String },
    adminMiddleName: { type: String },
    adminLastName: { type: String },
    studentId: { type: String },
    fullName: { type: String },
    email: { type: String },
    section: { type: String },
    strand: { type: String },
    grade: { type: String },
    semester: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.History || mongoose.model("History", historySchema);
