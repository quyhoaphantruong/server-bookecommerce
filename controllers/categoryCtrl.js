const Product = require("../models/Product");
const Category = require("../models/category");
const slugify = require("slugify");
// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({
      name: name,
      slug: slugify(name),
    });
    await category.save();
    res.status(201).json({ data: category, msg: "Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const insertCategories = async (req, res) => {
  const mockCategories = [
    { name: "Tất cả" },
    { name: "Lập trình" },
    { name: "Kỹ năng mềm" },
    { name: "Văn học" },
    { name: "Kinh tế" },
  ];
  try {
    // First, delete any existing categories in the database
    await Category.deleteMany({});

    // Insert the mock categories into the database
    await Category.insertMany(mockCategories);

    res.json("Mock data created successfully!");
  } catch (err) {
    console.error(err);
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category by ID
const updateCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ data: category, msg: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category by ID
const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    const productsWithCategory = await Product.find({ category: category._id });
    if (productsWithCategory) {
      productsWithCategory.forEach((products) => {
        products.category = "";
      });
      await productsWithCategory.save();
    }
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(204).json({
      msg: `Deleted ${category.name} successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  insertCategories,
  getCategories,
  updateCategoryById,
  deleteCategoryById,
};
