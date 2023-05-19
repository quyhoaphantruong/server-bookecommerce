const router = require("express").Router();
const categoryController = require("../controllers/categoryCtrl");

// Create a new category
router.post("/", categoryController.createCategory);
router.post("/insert-categories", categoryController.insertCategories);

// Get all categories
router.get("/", categoryController.getCategories);

// Update a category by ID
router.put("/:id", categoryController.updateCategoryById);

// Delete a category by ID
router.delete("/:id", categoryController.deleteCategoryById);

module.exports = router;
