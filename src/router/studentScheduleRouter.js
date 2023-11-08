const express = require("express");
const studentScheduleModel = require("../model/studentScheduleModel");

const router = express.Router();

router.post("/new-schedule", async (req, res) => {
  try {
    const {
      strand,
      yearLevel,
      semester,
      section,
      day,
      time,
      subject,
      instructor,
    } = req.body;

    const existingStrand = await studentScheduleModel.findOne({ strand });
    const existingYearLevel = await studentScheduleModel.findOne({ yearLevel });
    const existingSemester = await studentScheduleModel.findOne({ semester });
    const existingSection = await studentScheduleModel.findOne({ section });
    const existingDay = await studentScheduleModel.findOne({ day });
    const existingTime = await studentScheduleModel.findOne({ time });
    const existingSubject = await studentScheduleModel.findOne({ subject });
    const existingInstructor = await studentScheduleModel.findOne({
      instructor,
    });

    if (
      existingStrand &&
      existingYearLevel &&
      existingSemester &&
      existingSection &&
      existingDay &&
      existingTime &&
      existingSubject &&
      existingInstructor
    ) {
      return res.json("Same schedule exist");
    }

    const newStudentSched = new studentScheduleModel(req.body);
    await newStudentSched.save();

    return res.json(newStudentSched);
  } catch (err) {
    throw new Error("Failed" + err);
  }
});

router.delete("/remove-schedule/:scheduleId", async (req, res) => {
  try {
    const removeSchedule = await studentScheduleModel.findByIdAndDelete(
      req.params.scheduleId
    );
    return res.json(removeSchedule);
  } catch (err) {
    console.log(err);
  }
});

router.put("/edit-student-schedule", async (req, res) => {
  try {
    const updatedStudentSchedule = await studentScheduleModel.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true }
    );

    return res.json(updatedStudentSchedule);
  } catch (err) {
    throw new Error("failed " + err);
  }
});

router.get("/", async (req, res) => {
  try {
    const studentSched = await studentScheduleModel.find();
    return res.json(studentSched);
  } catch (error) {
    throw new Error("err" + error);
  }
});

module.exports = router;
