const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Category = require("../models/category");
const CloudinaryImage = require("../models/CloudinaryImage");
const Product = require("../models/Product");

const handleImages = async (req, path = "ecommerce") => {
  const uploadedFiles = [];

  for (const file of req.files) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: path,
      }
    );
    const newImage = new CloudinaryImage({
      imageUrl: secure_url,
      publicId: public_id,
    });
    await newImage.save();
    fs.unlink(file.path, (err) => {
      if (err) console.log(err);
      else {
        console.log("Deleted file: " + file.path);
      }
    });
    uploadedFiles.push(newImage);
  }
  return uploadedFiles;
};

const handleDeleteImage = async (files) => {
  console.log("delete image");
  try {
    for (const file of files) {
      const { result } = await cloudinary.uploader.destroy(file.publicId);
      const image = await CloudinaryImage.findByIdAndDelete(file._id);
      console.log(image);
      if (result !== "ok") {
        return result;
      }
    }
    return "Deleted successfully";
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createProduct: async (req, res) => {
    try {
      let uploadedFiles = [];
      console.log("files", req.files);
      if (req.files) {
        uploadedFiles = await handleImages(req, "books");
      }

      const { name, price, authorName, description } = req.body;
      const newProduct = new Product({
        name,
        price,
        authorName,
        description,
        images: uploadedFiles,
      });
      await newProduct.save();
      res.json(newProduct);
    } catch (err) {
      res.status(401).json({ msg: err.message });
    }
  },
  addImage: async (req, res) => {
    const { productId } = req.body;
    if (!req.files)
      return res.status(401).json({ msg: "Image wasn't uploaded" });
    const newImages = await handleImages(req);
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { images: newImages },
      },
      { new: true }
    );
    res.status(201).json(product);
  },
  deleteProductImage: async (req, res) => {
    const { imageId } = req.params;
    const { productId } = req.body;

    const image = await CloudinaryImage.findByIdAndDelete(imageId);
    const result = await cloudinary.uploader.destroy(image.publicId);
    await Product.findByIdAndUpdate(productId, {
      $pull: { images: { _id: imageId } },
    });

    res.json(result);
  },
  deleteProduct: async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findByIdAndDelete(productId).populate(
      "images"
    );
    let deletedImages;
    if (product?.images.length > 0) {
      deletedImages = await handleDeleteImage(product.images);
    }

    res.json({ product, deletedImages });
  },
  getRecentProducts: async (req, res) => {
    const products = await Product.find().limit(4);
    res.status(200).json(products);
  },
  getProducts: async (req, res) => {
    const { page } = req.query;

    const pageSize = 3;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / pageSize);
    let products;

    products = await Product.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({
      data: products,
      totalPages: totalPages,
    });
  },
  getProductsByCategory: async (req, res) => {
    const { categorySlug } = req.params;
    const find = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          let: { categoryId: "$category" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$categoryId", "$_id"] },
                    { $eq: ["$slug", categorySlug] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: "categoryDetails",
        },
      },
      {
        $match: {
          categoryDetails: { $ne: [] },
        },
      },
    ]);

    res.status(200).json(find);
  },
  getProductsForAdmin: async (req, res) => {
    const products = await Product.find().populate("images");
    res.status(200).json(products);
  },
  getProductById: async (req, res) => {
    const products = await Product.findById(req.params.productId).populate(
      "images"
    );
    res.status(200).json(products);
  },
  updateProductById: async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json({ data: product, msg: "Successfully" });
  },
};
