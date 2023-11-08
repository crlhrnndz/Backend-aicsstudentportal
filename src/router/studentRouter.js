const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const historyModel = require("../model/historyModel");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/student-profile");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.random() * 1000}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post("/new-student", async (req, res) => {
  try {
    const {
      studentId,
      firstName,
      lastName,
      middleName,
      email,
      password,
      contactNumber,
      strand,
      grade,
      section,
      dateOfBirth,
      schoolYear,
      semester,
    } = req.body;

    const email__ = await userModel.findOne({ email });
    const studentId__ = await userModel.findOne({ studentId });

    if (email__) return res.json(`Email is already exist`);
    if (studentId__) return res.json(`Student id is already exist`);

    const hashPassword = await bcrypt.hash(password, 10);
    const role = "student";

    const newStudent = await userModel.create({
      studentId,
      firstName,
      lastName,
      middleName,
      fullName: `${firstName} ${middleName} ${lastName}`,
      email,
      password: hashPassword,
      contactNumber,
      role,
      strand,
      grade,
      section,
      dateOfBirth,
      schoolYear,
      semester,
    });

    return res.json(newStudent);
  } catch (error) {
    throw new Error(error);
  }
});

router.put("/edit-student-info", async (req, res) => {
  try {
    const { updateStudentInfo, adminId } = req.body;

    const adminProfile = await userModel.findById(adminId);

    const editStudentInfo = await userModel.findOneAndUpdate(
      { studentId: updateStudentInfo.studentId },
      { $set: updateStudentInfo },
      { new: true }
    );

    await historyModel.create({
      adminId,
      adminFirstName: adminProfile.firstName,
      adminMiddleName: adminProfile.middleName,
      adminLastName: adminProfile.lastName,
      ...updateStudentInfo,
    });

    return res.json(editStudentInfo);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const removeStudent = await userModel.findByIdAndDelete(
      req.params.studentId
    );
    return res.json(removeStudent);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

router.patch(
  "/change-student-profile",
  upload.single("studentProfile"),
  async (req, res) => {
    try {
      if (!req.file) return res.json("Please provide image profile");

      const { studentId } = req.body;
      const changeProfile = await userModel.findByIdAndUpdate(
        studentId,
        { $set: { profile: req.file.path } },
        { new: true }
      );
      return res.json(changeProfile);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const role = req.query.role;

    const students = await userModel.find({ role });
    return res.json(students);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
