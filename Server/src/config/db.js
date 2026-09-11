import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// قراءة الرابط سواء كان اسمه DATABASE_URL أو CONNECTION_STRING
const connectionString = process.env.DATABASE_URL || process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => console.log("db error", err));

export default pool;