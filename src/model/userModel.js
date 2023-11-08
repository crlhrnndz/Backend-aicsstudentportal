const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    adminId: { type: String },
    facultyId: { type: String },
    studentId: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
    age: { type: Number, min: 0 },
    gender: { type: String },
    dateOfBirth: { type: String },
    address: { type: String },
    nationality: { type: String },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String },
    strand: { type: String },
    grade: { type: String },
    section: { type: String },
    status: { type: String },
    address: { type: String },
    role: { type: String, required: true },
    password: { type: String },
    profile: { type: String },
    schoolYear: { type: String },
    semester: { type: String },
    selected: { type: Boolean, default: false },
    canUploadGrades: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
