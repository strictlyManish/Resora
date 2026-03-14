const express = require("express");
const { RegisterController, LoginController, LogoutController,GetUserController } = require("../controller/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const authRoutes  = express.Router();





authRoutes.post("/register",RegisterController);
authRoutes.post("/login",LoginController);
authRoutes.post("/logout",LogoutController);






/**
 * @description special routes for get user data
 * @access private
 */

authRoutes.get("/get-me",AuthMiddleware,GetUserController)


module.exports = authRoutes;