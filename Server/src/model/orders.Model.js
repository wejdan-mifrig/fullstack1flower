import pool from "../config/db.js";



// =======================================
// Create Order
// =======================================

export const createOrder = async (
  userId,
  totalPrice
)=>{


const result = await pool.query(

`
INSERT INTO orders
(
user_id,
total_price
)

VALUES($1,$2)

RETURNING *
`
,
[
userId,
totalPrice
]

);


return result.rows[0];

};





// =======================================
// Add Items To Order
// =======================================


export const createOrderItem = async (

orderId,
productId,
quantity,
price

)=>{


const result = await pool.query(

`
INSERT INTO order_items

(
order_id,
product_id,
quantity,
price
)

VALUES($1,$2,$3,$4)

RETURNING *
`
,
[
orderId,
productId,
quantity,
price
]

);


return result.rows[0];


};







// =======================================
// Get All Orders Admin
// =======================================


export const getAllOrders = async ()=>{


const result = await pool.query(

`
SELECT


orders.id,

orders.total_price,

orders.status,

orders.admin_message,

orders.created_at,


users.id AS user_id,

users.name,

users.email



FROM orders


JOIN users

ON orders.user_id = users.id


ORDER BY orders.created_at DESC

`

);



return result.rows;


};







// =======================================
// Get Single Order User
// =======================================


export const getOrderById = async (

id,
userId

)=>{


const result = await pool.query(

`

SELECT *

FROM orders

WHERE id=$1
AND user_id=$2

`

,
[
id,
userId
]

);


return result.rows[0];


};







// =======================================
// Get Order Items
// =======================================


export const getOrderItems = async (

orderId

)=>{


const result = await pool.query(

`

SELECT


order_items.id,


order_items.quantity,


order_items.price,


menu.id AS product_id,


menu.name,


menu.image



FROM order_items


JOIN menu

ON menu.id = order_items.product_id



WHERE order_items.order_id=$1


`

,
[
orderId
]

);



return result.rows;


};







// =======================================
// User Orders
// =======================================


export const getOrdersByUser = async (

userId

)=>{


const result = await pool.query(

`

SELECT *

FROM orders

WHERE user_id=$1

ORDER BY created_at DESC

`

,
[
userId
]

);



return result.rows;


};







// =======================================
// Update Status
// =======================================


export const updateOrderStatus = async (

id,
status,
adminMessage=null

)=>{


const result = await pool.query(

`

UPDATE orders


SET

status=$1,

admin_message=$2


WHERE id=$3


RETURNING *

`

,
[
status,
adminMessage,
id
]

);



return result.rows[0];


};







// =======================================
// Delete Order
// =======================================


export const deleteOrder = async (

id

)=>{


const result = await pool.query(

`

DELETE FROM orders

WHERE id=$1

RETURNING *

`

,
[
id
]

);



return result.rows[0];


};