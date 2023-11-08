const mongoose = require("mongoose");

const strandSchema = new mongoose.Schema(
  {
    strandName: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("strand", strandSchema);
