const mongoose = require("mongoose");
const songSchema = mongoose.Schema(
  {
    songName: { type: String },
    duration: { type: Number },
    songUrl: { type: String, required: true },
    artistRef: { type: mongoose.SchemaTypes.ObjectId, ref: "Artist" },
    albumRef: { type: mongoose.SchemaTypes.ObjectId, ref: "Album" },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
