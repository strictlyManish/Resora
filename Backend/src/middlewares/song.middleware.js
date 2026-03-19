const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../service/cloudiary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "songs",
    resource_type: "video", // ⚠️ IMPORTANT for audio
    format: async (req, file) => "mp3",
  },
});

const upload = multer({ storage });

module.exports = upload;