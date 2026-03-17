const express = require("express");
const UpdateprofileController = require("../controller/user.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");


const userRoutes  = express.Router();



userRoutes.post("/profile",AuthMiddleware,UpdateprofileController)


module.exports = userRoutes;