import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
    try {
        // Fleet summary stats
        const [yachts, alerts, maintenance, tickets] = await Promise.all([
            sql`SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'active') as active,
        COUNT(*) FILTER (WHERE status = 'maintenance') as in_maintenance,
        ROUND(AVG(health_score)) as avg_health
      FROM yachts`,

            sql`SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE type = 'critical' AND resolved = false) as critical,
        COUNT(*) FILTER (WHERE type = 'warning' AND resolved = false) as warnings
      FROM alerts WHERE resolved = false`,

            sql`SELECT COUNT(*) as scheduled FROM maintenance_records WHERE status IN ('scheduled', 'in_progress')`,

            sql`SELECT COUNT(*) as open FROM tickets WHERE status NOT IN ('resolved')`,
        ]);

        return NextResponse.json({
            fleet: yachts[0],
            alerts: alerts[0],
            maintenance: maintenance[0],
            tickets: tickets[0],
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        // Return mock data when DB is not configured
        return NextResponse.json({
            fleet: { total: 5, active: 3, in_maintenance: 2, avg_health: 80 },
            alerts: { total: 7, critical: 2, warnings: 3 },
            maintenance: { scheduled: 3 },
            tickets: { open: 4 },
        });
    }
}
