import { asyncHandler } from "../middleware/asyncHandler.Middleware.js"
import { 
    createCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from "../model/categories.Model.js"

export const createCategoryController = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await createCategory(name);
    return res.status(201).json({ message: "created", category: category });
});

export const getAllCategoriesController = asyncHandler(async (req, res) => {
    const categories = await getAllCategories();
    if (categories.length === 0) {
        return res.status(200).json({ message: "no categories yet", categories: [] });
    }
    return res.status(200).json({ message: "categories", categories: categories });
});

export const getCategoryByIdController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await getCategoryById(id);
    if (!category) {
        return res.status(404).json({ message: "category not found" });
    }
    return res.status(200).json({ message: "category", category: category });
});

export const updateCategoryController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    const updatedCategory = await updateCategory(id, name);
    if (!updatedCategory) {
        return res.status(404).json({ message: "category not found" });
    }
    return res.status(200).json({ message: "updated done", category: updatedCategory });
});

export const deleteCategoryController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const deletedCategory = await deleteCategory(id);
    if (!deletedCategory) {
        return res.status(404).json({ message: "category not found" });
    }
    return res.status(200).json({ message: "deleted done", category: deletedCategory });
});