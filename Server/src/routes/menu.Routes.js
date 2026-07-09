import express from "express"
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

const route = express.Router()


route.post("/menu", protect, adminOnly, globalRateLimit, validate(menuSchema), createMenuItemController)


route.get('/all-menu', getAllMenuItemController)


route.put("/menu/:id", protect, adminOnly, globalRateLimit, validate(menuSchema), updateMenuItemController)


route.delete("/menu/:id", protect, adminOnly, globalRateLimit, deleteMenuItemController)

export default route