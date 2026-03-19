const SongModel = require("../model/post.model");

async function UserPostController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Song file is required" });
    }

    if (!req.body.title || !req.body.artist) {
      return res.status(400).json({ message: "Title and artist required" });
    }

    const newSong = new SongModel({
      title: req.body.title,
      artist: req.body.artist,
      audioUrl: req.file.path,
      coverImage: req.body.coverImage,
      genre: req.body.genre,
    });

    await newSong.save();

    res.status(200).json({
      message: "Song uploaded",
      song: newSong,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function GetAllSongs(req, res) {
  try {
    const songs = await SongModel.find().sort({ createdAt: -1 });;

    res.status(200).json({
      message: 'Details fetched',
      songs
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching songs',
      error: error.message
    });
  }
}

module.exports = {UserPostController,GetAllSongs};