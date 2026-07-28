import express from "express";

import {
    addToCartController,
    getMyCartController,
    removeCartItemController,
    clearCartController
} from "../controller/cart.Controller.js";


import { protect } from "../middleware/protect.Middleware.js";


const route = express.Router();




// Add product

route.post(
"/cart",
protect,
addToCartController
);




// Get cart

route.get(
"/cart",
protect,
getMyCartController
);




// Remove item

route.delete(
"/cart/:id",
protect,
removeCartItemController
);




// Clear cart

route.delete(
"/cart",
protect,
clearCartController
);



export default route;