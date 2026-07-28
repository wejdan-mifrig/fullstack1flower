import { asyncHandler } from "../middleware/asyncHandler.Middleware.js";

import {
    addToCart,
    getCartByUser,
    removeFromCart,
    clearCart
} from "../model/cart.Model.js";




// =======================================
// Add To Cart
// =======================================

export const addToCartController =

asyncHandler(async(req,res)=>{


const userId = req.user.id;


const {
    product_id,
    quantity
} = req.body;



if(!product_id){

return res.status(400).json({

message:"Product id is required"

});

}



const cartItem = await addToCart(

userId,

product_id,

quantity || 1

);



return res.status(201).json({

message:"Product added to cart",

cartItem

});


});









// =======================================
// Get My Cart
// =======================================


export const getMyCartController =

asyncHandler(async(req,res)=>{


const userId = req.user.id;



const cart = await getCartByUser(

userId

);



return res.status(200).json({

cart

});


});









// =======================================
// Remove Cart Item
// =======================================


export const removeCartItemController =

asyncHandler(async(req,res)=>{


const userId = req.user.id;



const item = await removeFromCart(

req.params.id,

userId

);



if(!item){

return res.status(404).json({

message:"Item not found"

});

}



return res.status(200).json({

message:"Item removed",

item

});


});









// =======================================
// Clear Cart
// =======================================


export const clearCartController =

asyncHandler(async(req,res)=>{


await clearCart(

req.user.id

);



return res.status(200).json({

message:"Cart cleared"

});


});