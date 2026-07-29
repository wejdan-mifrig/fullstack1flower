import pool from "../config/db.js";

export const getAllUsers = async () => {
  const result = await pool.query(
    `
    SELECT id, name, email, role, created_at
    FROM users
    ORDER BY id ASC
    `
  );

  return result.rows;
};

export const getUserById = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
};

export const createUser = async (user) => {
  const result = await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      hashed_password,
      role
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4
    )
    RETURNING
      id,
      name,
      email,
      role,
      created_at
    `,
    [
      user.name,
      user.email,
      user.password,
      user.role || "user",
    ]
  );

  return result.rows[0];
};

export const updateUserInfo = async (
  userId,
  userInfo
) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      name = $1,
      email = $2,
      role = $3,
      hashed_password = $4
    WHERE id = $5
    RETURNING
      id,
      name,
      email,
      role,
      created_at
    `,
    [
      userInfo.name,
      userInfo.email,
      userInfo.role,
      userInfo.password,
      userId,
    ]
  );

  return result.rows[0];
};

export const deleteUser = async (id) => {
  await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    `,
    [id]
  );
};

export const saveRefreshTokens = async (
  id,
  token
) => {
  await pool.query(
    `
    UPDATE users
    SET refresh_tokens = $1
    WHERE id = $2
    `,
    [
      token,
      id,
    ]
  );
};