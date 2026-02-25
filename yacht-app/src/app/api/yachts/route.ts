import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
    try {
        const yachts = await sql`
      SELECT
        y.*,
        COUNT(a.id) FILTER (WHERE a.resolved = false) as active_alerts,
        COUNT(a.id) FILTER (WHERE a.type = 'critical' AND a.resolved = false) as critical_alerts
      FROM yachts y
      LEFT JOIN alerts a ON a.yacht_id = y.id
      GROUP BY y.id
      ORDER BY y.health_score ASC
    `;
        return NextResponse.json(yachts);
    } catch (error) {
        console.error("Yachts fetch error:", error);
        // Return mock data
        return NextResponse.json([
            { id: 1, name: "Azzurra I", hin: "AZM1234567IT2022", model: "Azimut S8", manufacturer: "Azimut Yachts", year: 2022, length_meters: 24.38, engine_type: "Twin Volvo IPS 1350", engine_hours: 342.5, owner_name: "Marco Rossi", health_score: 92, status: "active", active_alerts: 1, critical_alerts: 0 },
            { id: 2, name: "La Dolce Vita", hin: "AZM2345678IT2021", model: "Azimut Grande 35", manufacturer: "Azimut Yachts", year: 2021, length_meters: 35.0, engine_type: "Twin MTU 16V 2000", engine_hours: 1240.0, owner_name: "Sophia Bianchi", health_score: 74, status: "maintenance", active_alerts: 2, critical_alerts: 1 },
            { id: 3, name: "Ferretti 780", hin: "FER3456789IT2023", model: "Ferretti 780", manufacturer: "Ferretti Group", year: 2023, length_meters: 23.72, engine_type: "Twin Volvo IPS 1050", engine_hours: 87.0, owner_name: "Luca Conti", health_score: 97, status: "active", active_alerts: 1, critical_alerts: 0 },
            { id: 4, name: "Predator 74", hin: "SUN4567890UK2020", model: "Predator 74", manufacturer: "Sunseeker", year: 2020, length_meters: 22.55, engine_type: "Twin MAN V12", engine_hours: 2156.0, owner_name: "James Wellington", health_score: 58, status: "maintenance", active_alerts: 3, critical_alerts: 1 },
            { id: 5, name: "Azimut 55", hin: "AZM5678901IT2019", model: "Azimut 55", manufacturer: "Azimut Yachts", year: 2019, length_meters: 16.77, engine_type: "Twin Mercruiser 8.2", engine_hours: 3421.0, owner_name: "Elena Ferrari", health_score: 81, status: "active", active_alerts: 1, critical_alerts: 0 },
        ]);
    }
}
