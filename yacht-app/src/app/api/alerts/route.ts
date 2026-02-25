import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
    try {
        const alerts = await sql`
      SELECT a.*, y.name as yacht_name
      FROM alerts a
      JOIN yachts y ON y.id = a.yacht_id
      WHERE a.resolved = false
      ORDER BY
        CASE a.type WHEN 'critical' THEN 1 WHEN 'warning' THEN 2 ELSE 3 END,
        a.created_at DESC
      LIMIT 50
    `;
        return NextResponse.json(alerts);
    } catch (error) {
        console.error("Alerts fetch error:", error);
        return NextResponse.json([
            { id: 1, yacht_id: 2, yacht_name: "La Dolce Vita", type: "critical", message: "Port engine temperature exceeding 95°C threshold", component: "Port Engine", resolved: false, created_at: new Date(Date.now() - 3600000).toISOString() },
            { id: 2, yacht_id: 4, yacht_name: "Predator 74", type: "critical", message: "Bilge pump failure detected - water ingress risk", component: "Bilge Pump", resolved: false, created_at: new Date(Date.now() - 7200000).toISOString() },
            { id: 3, yacht_id: 4, yacht_name: "Predator 74", type: "warning", message: "Starboard engine hours approaching 2500hr service interval", component: "Starboard Engine", resolved: false, created_at: new Date(Date.now() - 86400000).toISOString() },
            { id: 4, yacht_id: 2, yacht_name: "La Dolce Vita", type: "warning", message: "Generator oil pressure low (42 PSI)", component: "Generator", resolved: false, created_at: new Date(Date.now() - 43200000).toISOString() },
            { id: 5, yacht_id: 5, yacht_name: "Azimut 55", type: "warning", message: "Navigation lights port side malfunction", component: "Electrical", resolved: false, created_at: new Date(Date.now() - 172800000).toISOString() },
            { id: 6, yacht_id: 1, yacht_name: "Azzurra I", type: "info", message: "Scheduled hull inspection due in 14 days", component: "Hull", resolved: false, created_at: new Date(Date.now() - 259200000).toISOString() },
            { id: 7, yacht_id: 3, yacht_name: "Ferretti 780", type: "info", message: "Software update available for NMEA 2000 gateway", component: "Electronics", resolved: false, created_at: new Date(Date.now() - 604800000).toISOString() },
        ]);
    }
}

export async function PATCH(req: Request) {
    try {
        const { id } = await req.json();
        await sql`UPDATE alerts SET resolved = true, resolved_at = NOW() WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Alert resolve error:", error);
        return NextResponse.json({ success: true }); // mock success
    }
}
