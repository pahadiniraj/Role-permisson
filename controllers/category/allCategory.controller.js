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

export { addController, getCategories };
