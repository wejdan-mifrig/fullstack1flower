import { asyncHandler } from "../middleware/asyncHandler.Middleware.js";

import {
    addToCart,
    getCartByUser,
    removeFromCart,
    clearCart,
    updateCartQuantity
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
// UPDATE QUANTITY
// =======================================

export const updateCartItemQuantityController =

asyncHandler(async(req,res)=>{

const userId = req.user.id;

const { id } = req.params;

const { quantity } = req.body;

if(quantity === undefined || quantity === null){

return res.status(400).json({

message:"Quantity is required"

});

}

if(quantity < 1){

return res.status(400).json({

message:"Quantity must be at least 1"

});

}

const updatedItem = await updateCartQuantity(

id,

userId,

quantity

);

if(!updatedItem){

return res.status(404).json({

message:"Cart item not found"

});

}

const cart = await getCartByUser(userId);

return res.status(200).json({

message:"Quantity updated successfully",

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