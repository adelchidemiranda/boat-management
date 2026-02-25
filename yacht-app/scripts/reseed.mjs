import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_JEFIepa9MV7P@ep-sparkling-moon-agkawg0t-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const sql = neon(DATABASE_URL);

// Clean and re-seed non-idempotent tables (no unique constraint)
console.log("Cleaning duplicate rows...");
await sql`TRUNCATE maintenance_records, tickets, alerts RESTART IDENTITY CASCADE`;
console.log("✓ Truncated maintenance_records, tickets, alerts");

await sql`INSERT INTO alerts (yacht_id,type,message,component,resolved) VALUES
  (2,'critical','Port engine temperature exceeding 95°C threshold','Port Engine',false),
  (4,'critical','Bilge pump failure detected - water ingress risk','Bilge Pump',false),
  (4,'warning','Starboard engine hours approaching 2500hr service interval','Starboard Engine',false),
  (2,'warning','Generator oil pressure low (42 PSI)','Generator',false),
  (5,'warning','Navigation lights port side malfunction','Electrical',false),
  (1,'info','Scheduled hull inspection due in 14 days','Hull',false),
  (3,'info','Software update available for NMEA 2000 gateway','Electronics',false)`;
console.log("✓ Seeded alerts (7)");

await sql`INSERT INTO maintenance_records (yacht_id,type,description,status,technician,cost,scheduled_date,completed_date) VALUES
  (2,'Engine Service','Full engine overhaul - port engine','in_progress','Mario Esposito',8500.00,'2026-02-15',NULL),
  (4,'Bilge Pump Replacement','Replace failed bilge pump unit','scheduled','John Smith',1200.00,'2026-02-22',NULL),
  (1,'Annual Survey','Annual hull and machinery survey','scheduled','TBD',3500.00,'2026-03-10',NULL),
  (3,'Oil Change','Twin engine oil and filter change','completed','Luigi Marino',450.00,'2026-01-20','2026-01-20'),
  (5,'Antifouling','Hull antifouling treatment','completed','Nikos Papadopoulos',2800.00,'2026-01-05','2026-01-07')`;
console.log("✓ Seeded maintenance_records (5)");

await sql`INSERT INTO tickets (yacht_id,title,description,priority,status,assigned_to,estimated_cost) VALUES
  (2,'Engine Overheating Alert','Port engine temp critical. Needs immediate inspection.','critical','in_progress','Mario Esposito',8500.00),
  (4,'Bilge Pump Failure','Primary bilge pump not responding. Backup engaged.','critical','assigned','John Smith',1200.00),
  (5,'Navigation Light Fault','Port navigation light flickering. Possible wiring issue.','medium','open',NULL,350.00),
  (1,'Routine Hull Check','Annual underwater hull inspection required.','low','open',NULL,3500.00)`;
console.log("✓ Seeded tickets (4)");

const [m, a, t] = await Promise.all([
    sql`SELECT COUNT(*) as n FROM maintenance_records`,
    sql`SELECT COUNT(*) as n FROM alerts`,
    sql`SELECT COUNT(*) as n FROM tickets`,
]);
console.log(`\n✅ Clean seed complete: ${m[0].n} maintenance | ${a[0].n} alerts | ${t[0].n} tickets`);
