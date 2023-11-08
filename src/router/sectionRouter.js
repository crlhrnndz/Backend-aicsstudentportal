const express = require("express");
const sectionModel = require("../model/sectionModel");

const router = express.Router();

router.post("/new-section", async (req, res) => {
  try {
    const newSection = await sectionModel.create(req.body);
    return res.json(newSection);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

router.put("/edit-section", async (req, res) => {
  try {
    const editSection = await sectionModel.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true }
    );
    return res.json(editSection);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

router.delete("/remove-section/:sectionId", async (req, res) => {
  try {
    const removeSection = await sectionModel.findByIdAndDelete(
      req.params.sectionId
    );
    return res.json(removeSection);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

router.get("/", async (req, res) => {
  try {
    const sections = await sectionModel.find();
    return res.json(sections);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

module.exports = router;
