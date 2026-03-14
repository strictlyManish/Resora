const jwt = require("jsonwebtoken");
const BlackListModel = require("../model/blacklist.model");

/**
 * @route   get /api/auth/get-me
 * @desc    Authentication Middleware
 * @access  private
 
 */

async function AuthMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Token not provided.",
      });
    }

    const isBlacklisted = await BlackListModel.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    const decoded_data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded_data;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = AuthMiddleware;