import { asyncHandler } from "../middleware/asyncHandler.Middleware.js";

import {
  createOrder,
  createOrderItem,
  getAllOrders,
  getOrdersByUser,
  getOrderItems,
  getOrderById,
  updateOrderStatus,
} from "../model/orders.Model.js";


import {
  getCartByUser,
  clearCart,
} from "../model/cart.Model.js";




// ======================================================
// Create Order From Cart
// ======================================================

export const createOrderController =

asyncHandler(async(req,res)=>{


const userId = req.user.id;



// جلب الكارت

const cartItems = await getCartByUser(
  userId
);



if(!cartItems || cartItems.length === 0){


return res.status(400).json({

message:"Cart is empty"

});


}





// حساب السعر

const totalPrice = cartItems.reduce(

(total,item)=>{

return total + 
(Number(item.price) * item.quantity);

},

0

);






// إنشاء الطلب

const order = await createOrder(

userId,

totalPrice

);







// نقل المنتجات إلى order_items


for(const item of cartItems){


await createOrderItem(

order.id,

item.product_id,

item.quantity,

item.price

);


}






// تفريغ الكارت

await clearCart(

userId

);






return res.status(201).json({

message:"Order created successfully",

order

});



});









// ======================================================
// Get All Orders Admin
// ======================================================


export const getAllOrdersController =

asyncHandler(async(req,res)=>{


const orders = await getAllOrders();




for(const order of orders){


order.items = await getOrderItems(

order.id

);


}





return res.status(200).json({

orders

});


});









// ======================================================
// Get My Orders User
// ======================================================


export const getMyOrdersController =

asyncHandler(async(req,res)=>{


const userId = req.user.id;



const orders = await getOrdersByUser(

userId

);




for(const order of orders){


order.items = await getOrderItems(

order.id

);


}





return res.status(200).json({

orders

});


});









// ======================================================
// Get Single Order
// ======================================================


export const getSingleOrderController =

asyncHandler(async(req,res)=>{


const order = await getOrderById(

req.params.id,

req.user.id

);




if(!order){


return res.status(404).json({

message:"Order not found"

});


}





order.items = await getOrderItems(

order.id

);




return res.status(200).json({

order

});


});









// ======================================================
// Accept Order
// ======================================================


export const acceptOrderController =

asyncHandler(async(req,res)=>{


const order = await updateOrderStatus(

req.params.id,

"Accepted",

"Your booking has been accepted"

);





if(!order){


return res.status(404).json({

message:"Order not found"

});


}





return res.status(200).json({

message:"Order accepted successfully",

order

});


});









// ======================================================
// Reject Order
// ======================================================


export const rejectOrderController =

asyncHandler(async(req,res)=>{


const {
message
}=req.body;




if(!message){


return res.status(400).json({

message:"Rejection reason is required"

});


}





const order = await updateOrderStatus(

req.params.id,

"Rejected",

message

);





if(!order){


return res.status(404).json({

message:"Order not found"

});


}





return res.status(200).json({

message:"Order rejected successfully",

order

});


});