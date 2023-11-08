const mongoose = require("mongoose");

const facultyScheduleSchema = new mongoose.Schema(
  {
    facultyId: { type: String },
    instructor: { type: String },
    day: { type: String },
    time: { type: String },
    semester: { type: String },
    subject: { type: String },
    section: { type: String },
    strand: { type: String },
    grade: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("faculty_schedule", facultyScheduleSchema);
