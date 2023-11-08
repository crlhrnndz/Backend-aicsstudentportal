const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/admin-profile");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.random() * 1000}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post("/log-in", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await userModel.findOne({
      $or: [{ facultyId: userId }, { studentId: userId }, { adminId: userId }],
    });

    if (!user) return res.json("User id doesn't exist");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (passwordCompare) {
      return res.json({ token, role: user.role });
    }

    return res.json("password is incorrect");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.put("/edit-profile", async (req, res) => {
  try {
    const newProfile = await userModel.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true }
    );

    return res.json(newProfile);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/change-profile", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.json("Please provide image profile");

    const updateAdminProfile = await userModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: { profile: req.file.path },
      },
      { new: true }
    );

    return res.json(updateAdminProfile);
  } catch (err) {
    console.log(err);
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const { studentId, currentPassword, newPassword } = req.body;

    const user = await userModel.findById(studentId);

    const passwordCompare = await bcrypt.compare(
      currentPassword,
      user.password
    );

    const hashPassword = await bcrypt.hash(newPassword, 10);

    if (passwordCompare) {
      const newUserPassword = await userModel.findByIdAndUpdate(
        studentId,
        { $set: { password: hashPassword } },
        { new: true }
      );

      return res.json(newUserPassword);
    }

    return res.json("Current password incorrect");
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-user", protect, async (req, res) => {
  try {
    if (req.user) {
      return res.json(req.user);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
