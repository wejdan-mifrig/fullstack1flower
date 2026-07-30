import pool from "../config/db.js";

export const addToCart = async (userId, productId, quantity) => {
  const result = await pool.query(
    `
INSERT INTO cart
(
user_id,
product_id,
quantity
)

VALUES($1,$2,$3)

ON CONFLICT(user_id,product_id)

DO UPDATE SET

quantity = cart.quantity + EXCLUDED.quantity

RETURNING *

`,
    [userId, productId, quantity],
  );

  return result.rows[0];
};

export const getCartByUser = async (userId) => {
  const result = await pool.query(
    `

SELECT

cart.id,

cart.quantity,


menu.id AS product_id,

menu.name,

menu.price,

menu.image



FROM cart


JOIN menu

ON cart.product_id = menu.id


WHERE cart.user_id=$1


ORDER BY cart.created_at DESC


`,
    [userId],
  );

  return result.rows;
};

export const updateCartQuantity = async (id, userId, quantity) => {
  const result = await pool.query(
    `

UPDATE cart

SET quantity = $1

WHERE id = $2

AND user_id = $3

RETURNING *

`,
    [quantity, id, userId],
  );

  return result.rows[0];
};

export const removeFromCart = async (id, userId) => {
  const result = await pool.query(
    `

DELETE FROM cart

WHERE id=$1

AND user_id=$2

RETURNING *

`,
    [id, userId],
  );

  return result.rows[0];
};

// Clear Cart
// =======================================

export const clearCart = async (userId) => {
  await pool.query(
    `
DELETE FROM cart

WHERE user_id=$1
`,
    [userId],
  );
};
