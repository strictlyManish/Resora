const express = require("express");
const {UserPostController, GetAllSongs, GetCurrentSong} = require("../controller/post.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/song.middleware");
const PostRoutes = express.Router();





PostRoutes.post("/upload" ,AuthMiddleware,upload.single("audioUrl"), UserPostController)
PostRoutes.get("/songs" ,AuthMiddleware, GetAllSongs)
PostRoutes.get("/song/:id" ,AuthMiddleware, GetCurrentSong)




module.exports = PostRoutes;