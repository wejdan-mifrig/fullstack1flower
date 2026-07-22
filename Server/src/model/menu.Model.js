import pool from "../config/db.js";

// ✅ أضفنا price للاستعلام والإمدادات $
export const createMenuItem = async (menuData) => {
  const result = await pool.query(
    "INSERT INTO menu (name, description, price, image, category_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [
      menuData.name,
      menuData.description,
      menuData.price, // ✅ السعر تم إضافته هنا
      menuData.image,
      menuData.category_id,
    ]
  );
  return result.rows[0];
};

export const getAllMenuItems = async () => {
  const result = await pool.query(`
    SELECT 
      menu.*, 
      categories.name AS category_name
    FROM menu
    JOIN categories 
      ON menu.category_id = categories.id
    ORDER BY categories.id, menu.id
  `);

  return result.rows;
};

// ✅ أضفنا price لـ UPDATE والـ Parameters
export const updateMenuItem = async (id, menuData) => {
  const result = await pool.query(
    "UPDATE menu SET name = $1, description = $2, price = $3, image = $4, category_id = $5 WHERE id = $6 RETURNING *",
    [
      menuData.name,
      menuData.description,
      menuData.price, // ✅ السعر تم إضافته هنا
      menuData.image,
      menuData.category_id,
      id,
    ]
  );
  return result.rows[0];
};

export const deleteMenuItem = async (id) => {
  const result = await pool.query("DELETE FROM menu WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};