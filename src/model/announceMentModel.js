const mongooose = require("mongoose");

const announcementSchema = new mongooose.Schema(
  {
    image: { type: String },
    title: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooose.model("announcement", announcementSchema);
