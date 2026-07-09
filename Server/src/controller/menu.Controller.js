import { asyncHandler } from "../middleware/asyncHandler.Middleware.js"
import { createMenuItem, getAllMenuItems, updateMenuItem, deleteMenuItem } from "../model/menu.Model.js"

export const createMenuItemController = asyncHandler(async (req, res) => {
    const { name, description, image, category_id } = req.body;
    const menuItem = await createMenuItem({ name, description, image, category_id });
    
    if (!menuItem) {
        return res.status(400).json({ success: false, message: "not created" });
    }
    return res.status(201).json({ success: true, message: "created done", menuItem: menuItem });
});

export const getAllMenuItemController = asyncHandler(async (req, res) => {
    const menuItem = await getAllMenuItems();
    
    if (!menuItem || menuItem.length === 0) {
        return res.status(200).json({ success: true, message: "no items yet", menuItem: [] });
    }
    return res.status(200).json({ success: true, message: "fetch done", menuItem: menuItem });
});

export const updateMenuItemController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, image, category_id } = req.body;
    
    const updatedItem = await updateMenuItem(id, { name, description, image, category_id });
    
    if (!updatedItem) {
        return res.status(404).json({ success: false, message: "Menu item not found" });
    }
    return res.status(200).json({ success: true, message: "updated done", menuItem: updatedItem });
});

export const deleteMenuItemController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const deletedItem = await deleteMenuItem(id);
    
    if (!deletedItem) {
        return res.status(404).json({ success: false, message: "Menu item not found" });
    }
    return res.status(200).json({ success: true, message: "deleted done", menuItem: deletedItem });
});