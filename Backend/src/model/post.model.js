const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      ref: "User",
    },
    audioUrl: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: ["pop", "rock", "hiphop", "lofi", "bollywood", "other", "bhakti" ,"party"],
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const SongModel = mongoose.model("Song", SongSchema);
module.exports = SongModel;
