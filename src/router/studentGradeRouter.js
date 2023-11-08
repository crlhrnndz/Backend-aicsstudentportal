const express = require("express");
const studentGradeModel = require("../model/studentGrades");
const router = express.Router();

router.post("/create-grade", async (req, res) => {
  try {
    const { gradeId } = req.body;

    const existingGrade =
      (await gradeId) && studentGradeModel.findById(gradeId);

    if (existingGrade) {
      const updatedGrades = await studentGradeModel.findByIdAndUpdate(
        gradeId,
        { $set: req.body },
        { new: true }
      );

      return res.json(updatedGrades);
    }

    const studentGrade = await studentGradeModel.create(req.body);
    return res.json(studentGrade);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const studentGrade = await studentGradeModel.find();
    return res.json(studentGrade);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const studentGrades = await studentGradeModel.find({
      studentId: req.params.studentId,
    });
    return res.json(studentGrades);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
