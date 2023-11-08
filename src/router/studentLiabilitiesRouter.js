const express = require("express");
const studentLiabilitiesModel = require("../model/studentLiabilitiesModel");

const router = express.Router();

router.post("/create-student-liabilities", async (req, res) => {
  try {
    const createStudentLia = await studentLiabilitiesModel.create(req.body);
    return res.json(createStudentLia);
  } catch (error) {
    console.log(error);
  }
});

router.delete(
  "/remove-student-liabilities/:liabilitiesId",
  async (req, res) => {
    try {
      const removeStudentLiabilities =
        await studentLiabilitiesModel.findByIdAndDelete(
          req.params.liabilitiesId
        );
      return res.json(removeStudentLiabilities);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const getAllStudentLia = await studentLiabilitiesModel.find();
    return res.json(getAllStudentLia);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const getStudentLiabilities = await studentLiabilitiesModel.find({
      studentId: req.params.studentId,
    });
    return res.json(getStudentLiabilities);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
