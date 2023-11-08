const express = require("express");
const strandModel = require("../model/strandModel");

const router = express.Router();

router.post("/new-strand", async (req, res) => {
  try {
    const newStrand = await strandModel.create(req.body);
    return res.json(newStrand);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

router.put("/edit-strand", async (req, res) => {
  try {
    const editedStrand = await strandModel.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true }
    );
    return res.json(editedStrand);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

router.delete("/remove-strand/:strandId", async (req, res) => {
  try {
    const removeStrand = await strandModel.findByIdAndDelete(
      req.params.strandId
    );
    return res.json(removeStrand);
  } catch (error) {
    throw new Error("Failed " + error);
  }
});

router.get("/", async (req, res) => {
  try {
    const strand = await strandModel.find();
    return res.json(strand);
  } catch (error) {
    throw new Error("Failed " + err);
  }
});

module.exports = router;
