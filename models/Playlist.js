const mongoose = require("mongoose");
const playlistSchema = mongoose.Schema(
    {
      isDeleted: { type: Boolean, required: true, default: false },
      songExisted: { type: Boolean, default: false },
      playlistName: { type: String, required: true },
      userRef: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
      albumRef: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Album" }],
      songRef: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Song" }],
    },
    { timestamps: true }
  );

const playlist = mongoose.model("playlist", playlistSchema);
module.exports = playlist;
