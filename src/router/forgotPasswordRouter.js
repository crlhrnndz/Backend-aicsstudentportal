const express = require("express");
const nodemailer = require("nodemailer");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) return res.json("Please provide a valid email");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 180,
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "20-07090@g.batstate-u.edu.ph",
        pass: "admf xesd xuen rzun",
      },
    });

    var mailOptions = {
      from: "AICS <20-07090@g.batstate-u.edu.ph>",
      to: email,
      subject: "Reset password",
      text: `http://localhost:5173/forgot-password?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.json({ yo: "error" });
        res.sendStatus(500);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ msg: "mesage  has been sent" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/change-password", async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (req.headers && req.headers.authorization.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id);

      const passwordCompare = await bcrypt.compare(newPassword, user.password);

      if (passwordCompare) {
        return res.json("Please create a strong password");
      }

      if (!user) {
        return res.status(400).json("Token has expired");
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);

      const changePassword = await userModel.findByIdAndUpdate(
        decoded.id,
        { $set: { password: hashPassword } },
        { new: true }
      );

      return res.status(200).json(changePassword);
    }
  } catch (error) {
    console.log(error);
    if (error.message === "jwt expired") return res.json("token has expired");
  }
});

router.get("/valid-token", async (req, res) => {
  try {
    if (req.headers && req.headers.authorization.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.id) return res.json("Token is valid");
    }
  } catch (error) {
    console.log(error);
    if (error.message === "jwt expired" || error.message === "jwt malformed")
      return res.json("token expired or not found");
  }
});

module.exports = router;
