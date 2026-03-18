const userModel = require("../model/app.model");
const uploadImage = require("../service/imagekit"); // your upload function

async function UpdateprofileController(req, res) {
  try {
    const { bio } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({
        message: "Invalid user or login again",
      });
    }

    let profileImageUrl;

    if (req.file) {
      const uploaded = await uploadImage(req.file);
      profileImageUrl = uploaded.url;
    }

    if (!profileImageUrl && !bio) {
      return res.status(400).json({
        message: "Nothing to update",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        ...(bio && { bio }),
        ...(profileImageUrl && { profileImage: profileImageUrl }),
      },
       { returnDocument: "after", runValidators: true }
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