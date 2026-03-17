const userModel = require("../model/app.model");

async function UpdateprofileController(req, res) {
  try {
    const { profileImage, bio } = req.body;
    const { id } = req.user;

    if (!id) {
      return res.status(401).json({
        message: "Invalid user or login again",
      });
    }

    if (!profileImage && !bio) {
      return res.status(400).json({
        message: "Nothing to update",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id, // ✅ correct
      { profileImage, bio },
      { new: true, runValidators: true }, // ✅ important
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = UpdateprofileController;
