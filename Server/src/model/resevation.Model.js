import pool from "../config/db.js";



 export const createReservation = async ({ user_Id,gusest, reservation_Date, reservation_Time, special_Req, reason }) => { 
const result = await pool.query(
'insert into reservation (user_Id,gusest, reservation_Date, reservation_Time, special_Req, reason) values ($1,$2,$3,$4,$5,$6) returning *',
    [user_Id,gusest, reservation_Date, reservation_Time, special_Req, reason]
  );
  return result.rows[0];
 },




export const getAllReservations = async () => {
  const result = await pool.query(`
    SELECT
      r.*,
      u.name,
      u.email,
      u.role
    FROM reservations r
    JOIN users u ON r.user_id = u.id
  `);

  return result.rows;
};



export const getReservationsId = async (id) => {
  const result = await pool.query(`
    SELECT
      r.*,
      u.name,
      u.email,
      u.role
    FROM reservations r
    JOIN users u ON r.user_id = u.id where r.id = $1
  `);

  return result.rows;
};




export const getReservationsbyuserId = async (id) => {
  const result = await pool.query(`
    SELECT
      r.*,
      u.name,
      u.email,
      u.role
    FROM reservations r
    JOIN users u ON r.user_id = u.id where r.id = $1
  `);

  return result.rows;
};
