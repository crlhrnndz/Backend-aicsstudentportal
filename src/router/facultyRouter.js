const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/faculty-profile");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.random() * 10000}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const role = req.query.role;

    const faculty = await userModel.find({ role });
    return res.json(faculty);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

router.delete("/:facultyId", async (req, res) => {
  try {
    const removeFaculty = await userModel.findByIdAndDelete(
      req.params.facultyId
    );
    return res.json(removeFaculty);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

router.put("/edit-faculty-profile", async (req, res) => {
  try {
    const editProfile = await userModel.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true }
    );
    return res.json(editProfile);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

router.patch(
  "/edit-profile-pic/:_id",
  upload.single("profile"),
  async (req, res) => {
    if (!req.file) return res.json("Please provide image");

    const profile = req.file.path;

    try {
      const editProfilePic = await userModel.findByIdAndUpdate(
        req.params._id,
        { $set: { profile } },
        { new: true }
      );

      return res.json(editProfilePic);
    } catch (error) {
      console.log(error);
    }
  }
);

router.put("/edit-faculty-info", async (req, res) => {
  try {
    const editFacultyInfo = await userModel.findOneAndUpdate(
      { facultyId: req.body.facultyId },
      { $set: req.body },
      { new: true }
    );

    return res.json(editFacultyInfo);
  } catch (error) {
    console.log(error);
  }
});

router.post("/new-faculty", async (req, res) => {
  try {
    const {
      facultyId,
      firstName,
      lastName,
      middleName,
      email,
      password,
      contactNumber,
      gender,
      dateOfBirth,
      status,
      address,
    } = req.body;

    const email__ = await userModel.findOne({ email });
    const facultyId__ = await userModel.findOne({ facultyId });
    if (email__) return res.json("Email is already exist");
    if (facultyId__) return res.json("Faculty id is already exist");

    const hashPassword = await bcrypt.hash(password, 10);
    const role = "faculty";

    const newUser = await userModel.create({
      facultyId,
      firstName,
      lastName,
      middleName,
      email,
      fullName: `${firstName} ${middleName} ${lastName}`,
      password: hashPassword,
      contactNumber,
      role,
      gender,
      dateOfBirth,
      status,
      address,
    });

    return res.json(newUser);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

router.patch("/can-upload-grades", async (req, res) => {
  try {
    const canUploadGrades = await userModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { canUploadGrades: req.body.isCanUploadGrade } },
      { new: true }
    );

    return res.json(canUploadGrades);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
