const mongoose = require("mongoose");

const studentLiabilitiesSchema = new mongoose.Schema(
  {
    studentId: { type: String },
    type: { type: String },
    amount: { type: Number },
    dueDate: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "student_liabilities",
  studentLiabilitiesSchema
);
