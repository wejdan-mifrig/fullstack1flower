import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL || process.env.CONNECTION_STRING;

// تفعيل SSL فقط إذا كان الرابط لا يحتوي على localhost
const isLocal = connectionString && (connectionString.includes("localhost") || connectionString.includes("127.0.0.1"));

const pool = new Pool({
  connectionString: connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

pool
  .connect()
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => console.log("db error", err));

export default pool;