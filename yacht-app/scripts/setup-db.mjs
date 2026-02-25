import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_JEFIepa9MV7P@ep-sparkling-moon-agkawg0t-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const sql = neon(DATABASE_URL);

async function run(label, fn) {
    try {
        await fn();
        console.log("✓", label);
    } catch (e) {
        console.error("✗", label, "—", e.message.split("\n")[0]);
    }
}

console.log("Setting up YachtSense NeonDB schema...\n");

// Tables
await run("manufacturers", () => sql`CREATE TABLE IF NOT EXISTS manufacturers (
  id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, country VARCHAR(50),
  contact_email VARCHAR(100), plan VARCHAR(20) DEFAULT 'base', created_at TIMESTAMP DEFAULT NOW()
)`);

await run("yachts", () => sql`CREATE TABLE IF NOT EXISTS yachts (
  id SERIAL PRIMARY KEY, manufacturer_id INTEGER REFERENCES manufacturers(id),
  name VARCHAR(100) NOT NULL, hin VARCHAR(50) UNIQUE NOT NULL,
  model VARCHAR(100) NOT NULL, manufacturer VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL, length_meters DECIMAL(6,2), engine_type VARCHAR(100),
  engine_hours DECIMAL(8,1) DEFAULT 0, owner_name VARCHAR(100), owner_email VARCHAR(100),
  health_score INTEGER DEFAULT 100 CHECK (health_score BETWEEN 0 AND 100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','maintenance','offline')),
  location_lat DECIMAL(10,6), location_lng DECIMAL(10,6),
  last_seen TIMESTAMP DEFAULT NOW(), created_at TIMESTAMP DEFAULT NOW()
)`);

await run("components", () => sql`CREATE TABLE IF NOT EXISTS components (
  id SERIAL PRIMARY KEY, yacht_id INTEGER REFERENCES yachts(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, type VARCHAR(50) NOT NULL, health_score INTEGER DEFAULT 100,
  install_date DATE, last_service DATE, hours_used DECIMAL(8,1) DEFAULT 0, notes TEXT
)`);

await run("sensor_readings", () => sql`CREATE TABLE IF NOT EXISTS sensor_readings (
  id SERIAL PRIMARY KEY, yacht_id INTEGER REFERENCES yachts(id) ON DELETE CASCADE,
  sensor_type VARCHAR(50) NOT NULL, value DECIMAL(10,3) NOT NULL, unit VARCHAR(20) NOT NULL,
  recorded_at TIMESTAMP DEFAULT NOW()
)`);

await run("maintenance_records", () => sql`CREATE TABLE IF NOT EXISTS maintenance_records (
  id SERIAL PRIMARY KEY, yacht_id INTEGER REFERENCES yachts(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, description TEXT,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled','in_progress','completed')),
  technician VARCHAR(100), cost DECIMAL(10,2) DEFAULT 0,
  scheduled_date DATE, completed_date DATE, created_at TIMESTAMP DEFAULT NOW()
)`);

await run("alerts", () => sql`CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY, yacht_id INTEGER REFERENCES yachts(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('critical','warning','info')),
  message TEXT NOT NULL, component VARCHAR(100), resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP, created_at TIMESTAMP DEFAULT NOW()
)`);

await run("documents", () => sql`CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY, yacht_id INTEGER REFERENCES yachts(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, name VARCHAR(200) NOT NULL, expiry_date DATE,
  status VARCHAR(20) DEFAULT 'valid' CHECK (status IN ('valid','expiring','expired')),
  file_url TEXT, created_at TIMESTAMP DEFAULT NOW()
)`);

await run("tickets", () => sql`CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY, yacht_id INTEGER REFERENCES yachts(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL, description TEXT,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low','medium','high','critical')),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','assigned','in_progress','resolved')),
  assigned_to VARCHAR(100), estimated_cost DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(), resolved_at TIMESTAMP
)`);

await run("insurance_profiles", () => sql`CREATE TABLE IF NOT EXISTS insurance_profiles (
  id SERIAL PRIMARY KEY, yacht_id INTEGER REFERENCES yachts(id) ON DELETE CASCADE,
  insurer VARCHAR(100), policy_number VARCHAR(100), risk_score INTEGER DEFAULT 50,
  premium_monthly DECIMAL(10,2), coverage_amount DECIMAL(12,2),
  expiry_date DATE, created_at TIMESTAMP DEFAULT NOW()
)`);

console.log("\nSeeding data...\n");

await run("seed manufacturers", () => sql`INSERT INTO manufacturers (name, country, contact_email, plan) VALUES
  ('Azimut Yachts','Italy','fleet@azimut.com','enterprise'),
  ('Ferretti Group','Italy','fleet@ferretti.com','premium'),
  ('Sunseeker','United Kingdom','fleet@sunseeker.com','premium')
  ON CONFLICT DO NOTHING`);

await run("seed yachts", () => sql`INSERT INTO yachts (manufacturer_id,name,hin,model,manufacturer,year,length_meters,engine_type,engine_hours,owner_name,owner_email,health_score,status,location_lat,location_lng) VALUES
  (1,'Azzurra I','AZM1234567IT2022','Azimut S8','Azimut Yachts',2022,24.38,'Twin Volvo IPS 1350',342.5,'Marco Rossi','marco.rossi@email.com',92,'active',43.8682,7.6848),
  (1,'La Dolce Vita','AZM2345678IT2021','Azimut Grande 35','Azimut Yachts',2021,35.0,'Twin MTU 16V 2000',1240.0,'Sophia Bianchi','sophia.bianchi@email.com',74,'maintenance',43.7102,7.2620),
  (2,'Ferretti 780','FER3456789IT2023','Ferretti 780','Ferretti Group',2023,23.72,'Twin Volvo IPS 1050',87.0,'Luca Conti','luca.conti@email.com',97,'active',41.2588,12.5946),
  (3,'Predator 74','SUN4567890UK2020','Predator 74','Sunseeker',2020,22.55,'Twin MAN V12',2156.0,'James Wellington','james.w@email.com',58,'maintenance',50.7192,-1.8808),
  (1,'Azimut 55','AZM5678901IT2019','Azimut 55','Azimut Yachts',2019,16.77,'Twin Mercruiser 8.2',3421.0,'Elena Ferrari','elena.f@email.com',81,'active',37.9838,23.7275)
  ON CONFLICT DO NOTHING`);

await run("seed alerts", () => sql`INSERT INTO alerts (yacht_id,type,message,component,resolved) VALUES
  (2,'critical','Port engine temperature exceeding 95°C threshold','Port Engine',false),
  (4,'critical','Bilge pump failure detected - water ingress risk','Bilge Pump',false),
  (4,'warning','Starboard engine hours approaching 2500hr service interval','Starboard Engine',false),
  (2,'warning','Generator oil pressure low (42 PSI)','Generator',false),
  (5,'warning','Navigation lights port side malfunction','Electrical',false),
  (1,'info','Scheduled hull inspection due in 14 days','Hull',false),
  (3,'info','Software update available for NMEA 2000 gateway','Electronics',false)
  ON CONFLICT DO NOTHING`);

await run("seed maintenance", () => sql`INSERT INTO maintenance_records (yacht_id,type,description,status,technician,cost,scheduled_date,completed_date) VALUES
  (2,'Engine Service','Full engine overhaul - port engine','in_progress','Mario Esposito',8500.00,'2026-02-15',NULL),
  (4,'Bilge Pump Replacement','Replace failed bilge pump unit','scheduled','John Smith',1200.00,'2026-02-22',NULL),
  (1,'Annual Survey','Annual hull and machinery survey','scheduled','TBD',3500.00,'2026-03-10',NULL),
  (3,'Oil Change','Twin engine oil and filter change','completed','Luigi Marino',450.00,'2026-01-20','2026-01-20'),
  (5,'Antifouling','Hull antifouling treatment','completed','Nikos Papadopoulos',2800.00,'2026-01-05','2026-01-07')
  ON CONFLICT DO NOTHING`);

await run("seed documents", () => sql`INSERT INTO documents (yacht_id,type,name,expiry_date,status) VALUES
  (1,'safety','Safety Equipment Certificate','2026-06-15','valid'),
  (2,'insurance','Marine Insurance Policy','2026-03-01','expiring'),
  (3,'license','Navigation License','2027-01-01','valid'),
  (4,'safety','Fire Safety Certificate','2025-12-31','expired'),
  (1,'warranty','Engine Warranty - Volvo IPS','2026-12-31','valid')
  ON CONFLICT DO NOTHING`);

await run("seed tickets", () => sql`INSERT INTO tickets (yacht_id,title,description,priority,status,assigned_to,estimated_cost) VALUES
  (2,'Engine Overheating Alert','Port engine temp critical. Needs immediate inspection.','critical','in_progress','Mario Esposito',8500.00),
  (4,'Bilge Pump Failure','Primary bilge pump not responding. Backup engaged.','critical','assigned','John Smith',1200.00),
  (5,'Navigation Light Fault','Port navigation light flickering. Possible wiring issue.','medium','open',NULL,350.00),
  (1,'Routine Hull Check','Annual underwater hull inspection required.','low','open',NULL,3500.00)
  ON CONFLICT DO NOTHING`);

const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`;
const yachtCount = await sql`SELECT COUNT(*) as n FROM yachts`;
console.log("\n✅ Done! Tables:", tables.map(t => t.table_name).join(", "));
console.log("   Yachts in DB:", yachtCount[0].n);
