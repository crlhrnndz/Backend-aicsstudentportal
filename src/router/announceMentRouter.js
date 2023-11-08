const express = require("express");
const announcementModel = require("../model/announceMentModel");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/announcement-image");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.random() * 1000 + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post(
  "/create-announcement",
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, content } = req.body;

      const image = req.file.path;

      const newAnnouncement = await announcementModel.create({
        image,
        title,
        content,
      });
      return res.json(newAnnouncement);
    } catch (error) {
      throw new Error("Failed " + error);
    }
  }
);

router.put("/edit-announcement", async (req, res) => {
  try {
    const editAnnouncement = await announcementModel.findByIdAndUpdate(
      req.body.announcementId,
      { $set: req.body },
      { new: true }
    );

    return res.json(editAnnouncement);
  } catch (error) {
    console.log(error);
  }
});

router.patch(
  "/change-announcement-image",
  upload.single("image"),
  async (req, res) => {
    try {
      const image = req.file && req.file.path;

      const changeAnnouncementImage = await announcementModel.findByIdAndUpdate(
        req.body.announcementId,
        { $set: { image } },
        { new: true }
      );

      return res.json(changeAnnouncementImage);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const announcement = await announcementModel.find();
    return res.json(announcement);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

router.delete("/remove-announcement/:announcementId", async (req, res) => {
  try {
    const removeAnnounceMent = await announcementModel.findByIdAndDelete(
      req.params.announcementId
    );
    return res.json(removeAnnounceMent);
  } catch (err) {
    throw new Error("Failed " + err);
  }
});

module.exports = router;
