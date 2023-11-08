const express = require("express");
const facultyScheduleModel = require("../model/facultyScheduleModel");

const router = express.Router();

router.post("/new-schedule", async (req, res) => {
  try {
    const { instructor, semester, time, day, subject, section, strand, grade } =
      req.body;

    const existingInstructor = await facultyScheduleModel.findOne({
      instructor,
    });
    const existingSemester = await facultyScheduleModel.findOne({ semester });
    const existingTime = await facultyScheduleModel.findOne({ time });
    const existingDay = await facultyScheduleModel.findOne({ day });
    const existingSubject = await facultyScheduleModel.findOne({ subject });
    const existingSection = await facultyScheduleModel.findOne({ section });
    const existingStrand = await facultyScheduleModel.findOne({ strand });
    const existingGrade = await facultyScheduleModel.findOne({ grade });

    if (
      existingTime &&
      existingSemester &&
      existingDay &&
      existingSubject &&
      existingSection &&
      existingStrand &&
      existingGrade &&
      existingInstructor
    ) {
      return res.json(`Same schedule exist`);
    }

    const addFacultySchedule = await facultyScheduleModel.create(req.body);
    return res.json(addFacultySchedule);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

router.put("/edit-faculty-schedule", async (req, res) => {
  try {
    const editedFacultyChange = await facultyScheduleModel.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true }
    );

    return res.json(editedFacultyChange);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

router.delete("/remove-faculty-schedule/:scheduleId", async (req, res) => {
  try {
    const removeSchedule = await facultyScheduleModel.findByIdAndDelete(
      req.params.scheduleId
    );
    return res.json(removeSchedule);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

router.get("/", async (req, res) => {
  try {
    const facultySchedule = await facultyScheduleModel.find();
    return res.json(facultySchedule);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:facultyId", async (req, res) => {
  try {
    const schedule = await facultyScheduleModel.find({
      facultyId: req.params.facultyId,
    });
    return res.json(schedule);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

module.exports = router;
