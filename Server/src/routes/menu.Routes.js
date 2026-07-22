import express from "express"
import multer from "multer"
import path from "path"
import fs from "fs" // ✅ إضافة مكتبة النظام لمراقبة وإنشاء المجلدات
import { validate } from "../middleware/validate.Middleware.js"
import { protect } from "../middleware/protect.Middleware.js"
import { adminOnly } from "../middleware/adminOnly.Middleware.js"
import menuSchema from "../validation/menu.Validation.js"
import { globalRateLimit } from "../middleware/rateLimit.Middleware.js"
import { 
    createMenuItemController, 
    getAllMenuItemController, 
    updateMenuItemController, 
    deleteMenuItemController 
} from "../controller/menu.Controller.js"

// ----------------------------------------------------
// ✅ التأكد من وجود مجلد uploads وإنشائه تلقائياً إذا لم يكن موجوداً
// ----------------------------------------------------
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ----------------------------------------------------
// ✅ إعداد Multer لتخزين الصور المرفوعة في مجلد uploads
// ----------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const route = express.Router()

// ✅ إضافة منتج جديد
route.post(
  "/menu", 
  protect, 
  adminOnly, 
  globalRateLimit, 
  upload.single("image"), 
  validate(menuSchema), 
  createMenuItemController
)

// عرض جميع المنتجات
route.get('/all-menu', getAllMenuItemController)

// ✅ تعديل منتج 
route.put(
  "/menu/:id", 
  protect, 
  adminOnly, 
  globalRateLimit, 
  upload.single("image"), 
  validate(menuSchema), 
  updateMenuItemController
)

// حذف منتج
route.delete("/menu/:id", protect, adminOnly, globalRateLimit, deleteMenuItemController)

export default route