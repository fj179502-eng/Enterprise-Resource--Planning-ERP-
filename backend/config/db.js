import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    password: process.env.DB_PASSWORD || "faisal.12",
    database: process.env.DB_NAME || "ERP_system",
});

// Test DB connection on startup
pool.connect((err, client, release) => {
    if (err) {
        console.error("❌ PostgreSQL Connection Failed:", err.message);
    } else {
        console.log("✅ PostgreSQL Connected Successfully to database:", process.env.DB_NAME || "ERP_system");
        release();
    }
});

export default pool;