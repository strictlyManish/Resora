const express = require("express");
const UpdateprofileController = require("../controller/user.controller");
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

module.exports = userRoutes;
