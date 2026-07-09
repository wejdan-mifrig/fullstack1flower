import pool from "../config/db.js";


export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    console.log("📩 NEW MESSAGE:", { name, email, message });

    await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    return res.json({ success: true, message: "Message sent" });

  } catch (err) {
    console.log("🔥 SEND MESSAGE ERROR:");
    console.log(err); // 👈 هذا أهم سطر

    return res.status(500).json({
      error: err.message,
    });
  }
};


export const getMessages = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );

    return res.json(result.rows);

  } catch (err) {
    console.log("🔥 GET MESSAGES ERROR:");
    console.log(err);

    return res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM messages WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    return res.json({
      success: true,
      message: "Message deleted",
    });

  } catch (err) {
    console.log("🔥 DELETE MESSAGE ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
};


export const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "UPDATE messages SET is_read = true WHERE id = $1",
      [id]
    );

    res.json({ success: true, message: "Marked as read" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};