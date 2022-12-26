const mongoose = require("mongoose");
const ArtistSchema = mongoose.Schema(
  {
    artistName: { type: String, required: true },
    genre: { type: String, required: true },
    biography: { type: String, required: true },
    albumCollectionRef: { type: mongoose.SchemaTypes.ObjectId, ref: "Album" },
  },
  { timestamps: true }
);

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;
