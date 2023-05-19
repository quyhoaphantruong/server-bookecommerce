const cloudinaryImage = require("../models/CloudinaryImage");
const cloudinary = require("cloudinary").v2;

module.exports = {
  getImages: async (req, res) => {
    const images = await cloudinaryImage.find();

    res.status(200).json(images);
  },
  deleteImages: async (req, res) => {
    const images = await cloudinaryImage.find();
    await cloudinaryImage.deleteMany();
    console.log(images);
    for (const image of images) {
      await cloudinary.uploader.destroy(image.publicId);
    }
    res.json({ msg: "Deleted all images" });
  },
};
