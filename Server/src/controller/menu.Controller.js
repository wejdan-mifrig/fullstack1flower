import { asyncHandler } from "../middleware/asyncHandler.Middleware.js"
import { createMenuItem, getAllMenuItems, updateMenuItem, deleteMenuItem } from "../model/menu.Model.js"
import pool from "../config/db.js"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ============================================
// Create Menu Item مع صورة وسعر
// ============================================
export const createMenuItemController = asyncHandler(async (req, res) => {
    // ✅ أضفنا price هنا
    const { name, description, price, category_id } = req.body;
    
    console.log('📝 Creating menu item...');
    console.log('📦 Request body:', req.body);
    console.log('🖼️ Uploaded file:', req.file);

    // التحقق من وجود البيانات المطلوبة
    if (!name) {
        return res.status(400).json({ 
            success: false, 
            message: "❌ Name is required" 
        });
    }

    if (price === undefined || price === null || price === '') {
        return res.status(400).json({ 
            success: false, 
            message: "❌ Price is required" 
        });
    }

    if (!category_id) {
        return res.status(400).json({ 
            success: false, 
            message: "❌ Category ID is required" 
        });
    }

    // الحصول على اسم الصورة من multer (إذا وجدت)
    let imageName = null;
    if (req.file) {
        imageName = req.file.filename;
        console.log('✅ Image uploaded:', imageName);
    }

    // ✅ إنشاء المنتج وإرسال السعر كـ Float
    const menuItem = await createMenuItem({ 
        name, 
        description: description || '', 
        price: parseFloat(price), // ✅ تمرير السعر المعدل
        image: imageName, 
        category_id: parseInt(category_id) 
    });
    
    if (!menuItem) {
        return res.status(400).json({ 
            success: false, 
            message: "❌ Failed to create menu item" 
        });
    }

    return res.status(201).json({ 
        success: true, 
        message: "✅ Menu item created successfully", 
        menuItem: menuItem 
    });
});

// ============================================
// Get All Menu Items
// ============================================
export const getAllMenuItemController = asyncHandler(async (req, res) => {
    const menuItem = await getAllMenuItems();
    
    if (!menuItem || menuItem.length === 0) {
        return res.status(200).json({ 
            success: true, 
            message: "No items yet", 
            menuItem: [] 
        });
    }
    return res.status(200).json({ 
        success: true, 
        message: "fetch done", 
        menuItem: menuItem 
    });
});

// ============================================
// Update Menu Item مع صورة وسعر
// ============================================
export const updateMenuItemController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // ✅ أضفنا price هنا أيضاً
    const { name, description, price, category_id } = req.body;
    
    console.log(`📝 Updating menu item ${id}...`);
    console.log('📦 Request body:', req.body);
    console.log('🖼️ Uploaded file:', req.file);

    // جلب المنتج الحالي من قاعدة البيانات
    const currentItem = await pool.query(
        "SELECT * FROM menu WHERE id = $1",
        [id]
    );

    if (!currentItem.rows[0]) {
        return res.status(404).json({ 
            success: false, 
            message: "❌ Menu item not found" 
        });
    }

    let imageName = currentItem.rows[0].image; // الاحتفاظ بالصورة القديمة

    // إذا تم رفع صورة جديدة
    if (req.file) {
        if (currentItem.rows[0].image) {
            const imagesDir = path.join(__dirname, '../../uploads/'); // ✅ توحيد مجلد الصور إلى uploads
            const oldImagePath = path.join(imagesDir, currentItem.rows[0].image);
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath);
                    console.log('🗑️ Old image deleted:', currentItem.rows[0].image);
                } catch (err) {
                    console.warn('⚠️ Could not delete old image:', err.message);
                }
            }
        }
        imageName = req.file.filename;
        console.log('✅ New image uploaded:', imageName);
    }

    // ✅ تحديث المنتج مع السعر الجديد
    const updatedItem = await updateMenuItem(id, { 
        name: name || currentItem.rows[0].name, 
        description: description !== undefined ? description : currentItem.rows[0].description, 
        price: price !== undefined && price !== '' ? parseFloat(price) : currentItem.rows[0].price, // ✅ تحديث السعر
        image: imageName, 
        category_id: category_id ? parseInt(category_id) : currentItem.rows[0].category_id 
    });
    
    if (!updatedItem) {
        return res.status(404).json({ 
            success: false, 
            message: "❌ Menu item not found" 
        });
    }

    return res.status(200).json({ 
        success: true, 
        message: "✅ Menu item updated successfully", 
        menuItem: updatedItem 
    });
});

// ============================================
// Delete Menu Item مع حذف الصورة
// ============================================
export const deleteMenuItemController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    console.log(`🗑️ Deleting menu item ${id}...`);

    const currentItem = await pool.query(
        "SELECT * FROM menu WHERE id = $1",
        [id]
    );

    if (!currentItem.rows[0]) {
        return res.status(404).json({ 
            success: false, 
            message: "❌ Menu item not found" 
        });
    }

    if (currentItem.rows[0].image) {
        const imagesDir = path.join(__dirname, '../../uploads/');
        const imagePath = path.join(imagesDir, currentItem.rows[0].image);
        if (fs.existsSync(imagePath)) {
            try {
                fs.unlinkSync(imagePath);
                console.log('🗑️ Image deleted:', currentItem.rows[0].image);
            } catch (err) {
                console.warn('⚠️ Could not delete image:', err.message);
            }
        }
    }

    const deletedItem = await deleteMenuItem(id);
    
    if (!deletedItem) {
        return res.status(404).json({ 
            success: false, 
            message: "❌ Menu item not found" 
        });
    }

    return res.status(200).json({ 
        success: true, 
        message: "✅ Menu item deleted successfully", 
        menuItem: deletedItem 
    });
});