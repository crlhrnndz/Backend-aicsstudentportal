const express = require("express");
const historyModel = require("../model/historyModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const history = await historyModel.find({});
    return res.json(history);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
