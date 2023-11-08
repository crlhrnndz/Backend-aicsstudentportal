const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { token } = req.body;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
    );

    if (response.data.success) return res.send("Human 👨 👩");
    return res.send("Robot 🤖");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error verifying reCAPTCHA");
  }
});

module.exports = router;
