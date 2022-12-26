const mongoose = require("mongoose");
const playlistSchema = mongoose.Schema(
  {
    playlistName: { type: String, required: true },
    userRef: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const playlist = mongoose.model("playlist", playlistSchema);
module.exports = playlist;
