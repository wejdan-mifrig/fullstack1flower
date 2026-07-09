import pool from "../config/db.js";

export const createMenuItem = async (menuData) => {
  const result = await pool.query(
    "INSERT INTO menu (name, description, image, category_id) VALUES($1, $2, $3, $4) RETURNING *",
    [menuData.name, menuData.description, menuData.image, menuData.category_id]
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
export const updateMenuItem = async (id, menuData) => {
  const result = await pool.query(
    "UPDATE menu SET name = $1, description = $2, image = $3, category_id = $4 WHERE id = $5 RETURNING *",
    [menuData.name, menuData.description, menuData.image, menuData.category_id, id]
  );
  return result.rows[0];
};

export const deleteMenuItem = async (id) => {
  const result = await pool.query("DELETE FROM menu WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};