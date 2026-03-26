const express = require("express");
const {UpdateprofileController, GetUserpostController} = require("../controller/user.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const userRoutes = express.Router();

const upload = multer();

// ✅ update profile route
userRoutes.post(
  "/profile/:id",
  AuthMiddleware,
  upload.single("profileImage"),
  UpdateprofileController,
);


userRoutes.get('/posts',AuthMiddleware,GetUserpostController)



module.exports = userRoutes;
