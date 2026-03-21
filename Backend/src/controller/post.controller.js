const SongModel = require("../model/post.model");
const UserModel = require("../model/app.model");

async function UserPostController(req, res) {
  try {
    

    // 📁 File validation
    if (!req.file) {
      return res.status(400).json({ message: "Song file is required" });
    }

    const { title, artist, coverImage, genre } = req.body;

    // 📝 Field validation
    if (!title || !artist) {
      return res.status(400).json({ message: "Title and artist required" });
    }

    // 🎵 Create song
    const newSong = new SongModel({
      title,
      artist,
      audioUrl: req.file.path,
      coverImage,
      genre,
    });

    await newSong.save();

    // 👤 Update user posts
    await UserModel.findByIdAndUpdate(
      req.user.id,
      { $push: { posts: newSong } },
      { returnDocument: 'after' } // ✅ FIXED
    );

    // ✅ Response
    res.status(201).json({
      message: "Song uploaded",
      song: newSong,
    });

  } catch (err) {
    console.log(err);
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