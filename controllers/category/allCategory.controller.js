import { Category } from "../../model/category.model.js";

const addController = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = new Category({
      categoryName,
    });

    const isExist = await Category.findOne({
      categoryName: {
        $regex: categoryName,
        $options: "i",
      },
    });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }
    const categoryData = await category.save();
    return res.status(200).json({
      success: true,
      message: "Category added successfully",
      data: categoryData,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      success: true,
      data: categories,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const category = await Category.findByIdAndDelete({ _id: id });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id, categoryName } = req.body;
    const checkId = await Category.findOne({ _id: id });

    if (!checkId) {
      return res.status(404).json({
        success: false,
        message: "Category ID not found",
      });
    }
    if (checkId.categoryName.toLowerCase() === categoryName.toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: "Category name is the same as the current one",
      });
    }
    const checkBoth = await Category.findOne({
      categoryName: {
        $regex: categoryName,
        $options: "i",
      },
      _id: { $ne: id },
    });
    if (checkBoth) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const updateCategory = await Category.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          categoryName,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updateCategory,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { addController, getCategories, deleteCategory, updateCategory };
