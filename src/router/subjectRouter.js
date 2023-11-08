const express = require("express");
const subjectModel = require("../model/subjectModel");

const router = express.Router();

router.post("/new-subject", async (req, res) => {
  try {
    const newSubject = await subjectModel.create(req.body);
    return res.json(newSubject);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

router.put("/edit-subject", async (req, res) => {
  try {
    const editSubject = await subjectModel.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true }
    );

    return res.json(editSubject);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

router.delete("/remove-subject/:subjectId", async (req, res) => {
  try {
    const removeSubject = await subjectModel.findByIdAndDelete(
      req.params.subjectId
    );
    return res.json(removeSubject);
  } catch (error) {
    throw new Error("Failed " + err);
  }
});

router.get("/", async (req, res) => {
  try {
    const subject = await subjectModel.find();
    return res.json(subject);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

module.exports = router;
