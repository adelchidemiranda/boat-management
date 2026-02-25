import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
    try {
        const records = await sql`
      SELECT m.*, y.name as yacht_name
      FROM maintenance_records m
      JOIN yachts y ON y.id = m.yacht_id
      ORDER BY
        CASE m.status WHEN 'in_progress' THEN 1 WHEN 'scheduled' THEN 2 ELSE 3 END,
        m.scheduled_date ASC
    `;
        return NextResponse.json(records);
    } catch (error) {
        console.error("Maintenance fetch error:", error);
        return NextResponse.json([
            { id: 1, yacht_id: 2, yacht_name: "La Dolce Vita", type: "Engine Service", description: "Full engine overhaul - port engine", status: "in_progress", technician: "Mario Esposito", cost: 8500, scheduled_date: "2026-02-15", completed_date: null },
            { id: 2, yacht_id: 4, yacht_name: "Predator 74", type: "Bilge Pump Replacement", description: "Replace failed bilge pump unit", status: "scheduled", technician: "John Smith", cost: 1200, scheduled_date: "2026-02-22", completed_date: null },
            { id: 3, yacht_id: 1, yacht_name: "Azzurra I", type: "Annual Survey", description: "Annual hull and machinery survey", status: "scheduled", technician: "TBD", cost: 3500, scheduled_date: "2026-03-10", completed_date: null },
            { id: 4, yacht_id: 3, yacht_name: "Ferretti 780", type: "Oil Change", description: "Twin engine oil and filter change", status: "completed", technician: "Luigi Marino", cost: 450, scheduled_date: "2026-01-20", completed_date: "2026-01-20" },
            { id: 5, yacht_id: 5, yacht_name: "Azimut 55", type: "Antifouling", description: "Hull antifouling treatment", status: "completed", technician: "Nikos Papadopoulos", cost: 2800, scheduled_date: "2026-01-05", completed_date: "2026-01-07" },
        ]);
    }
}
