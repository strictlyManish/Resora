const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
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
      enum: ["pop", "rock", "hiphop", "lofi", "bollywood", "other" ,"bhakti"],
      required: true,
    },
    album: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const SongModel = mongoose.model("post",SongSchema);
module.exports = SongModel;