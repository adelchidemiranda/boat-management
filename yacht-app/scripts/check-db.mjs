import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_JEFIepa9MV7P@ep-sparkling-moon-agkawg0t-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const sql = neon(DATABASE_URL);

console.log("Connecting to NeonDB...");
console.log("URL prefix:", DATABASE_URL.substring(0, 80));

// Step 1: check current tables
const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
console.log("\nCurrent tables:", tables.length > 0 ? tables.map(t => t.table_name).join(", ") : "(none yet)");

// Step 2: create manufacturers table directly
try {
    await sql`CREATE TABLE IF NOT EXISTS manufacturers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50),
    contact_email VARCHAR(100),
    plan VARCHAR(20) DEFAULT 'base',
    created_at TIMESTAMP DEFAULT NOW()
  )`;
    console.log("✓ manufacturers table created");
} catch (e) {
    console.error("✗ manufacturers:", e.message);
}

// Step 3: verify
const tables2 = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
console.log("Tables after CREATE:", tables2.map(t => t.table_name).join(", ") || "(still none)");
