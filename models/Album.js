const mongoose = require("mongoose");
const albumSchema = mongoose.Schema(
  {
    ranking: { type: Number, required: true },
    album: { type: String, required: true },
    artistName: { type: String, required: true },
    releaseDate: { type: String, required: true },
    genre: { type: String, required: true },
    artistRef: { type: mongoose.SchemaTypes.ObjectId, ref: "Artist" },
    playlistRef: { type: mongoose.SchemaTypes.ObjectId, ref: "Playlist" },
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
