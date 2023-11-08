const mongoose = require("mongoose");

const studentGradeSchema = new mongoose.Schema(
  {
    studentId: { type: String },
    semester: { type: String },
    instructor: { type: String },
    subject: { type: String },
    grade: { type: Number },
    strand: { type: String },
    section: { type: String },
    schoolYear: { type: String },
    gradeLevel: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("student_grade", studentGradeSchema);
