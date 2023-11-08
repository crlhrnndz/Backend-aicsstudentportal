const mongoose = require("mongoose");

const studentScheduleSchema = new mongoose.Schema(
  {
    strand: { type: String },
    yearLevel: { type: String },
    section: { type: String },
    semester: { type: String },
    day: { type: String },
    time: { type: String },
    subject: { type: String },
    instructor: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("student_schedule", studentScheduleSchema);
