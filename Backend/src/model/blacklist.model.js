const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to be added in blacklist"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "7d",
    },
  },
  { timestamps: true },
);

const BlackListModel = mongoose.model("blacklisted_token",blacklistedTokenSchema);
module.exports = BlackListModel;