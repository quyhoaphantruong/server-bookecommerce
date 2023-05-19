const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "CloudinaryImage" }],
  publicUrl: { type: String, default: "" },
  viewCount: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
