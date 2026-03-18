const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImage = async (file) => {
  try {
    const response = await imagekit.upload({
      file: file.buffer.toString("base64"), // base64 / buffer / URL
      fileName: "profile.jpg",
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadImage;