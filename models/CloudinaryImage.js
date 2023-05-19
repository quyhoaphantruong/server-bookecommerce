const mongoose = require("mongoose");

const cloudinaryImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  publicId: {
    type: String,
  },
});

const cloudinaryImage = mongoose.model(
  "CloudinaryImage",
  cloudinaryImageSchema
);

module.exports = cloudinaryImage;
