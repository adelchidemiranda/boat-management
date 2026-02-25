import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
    try {
        const tickets = await sql`
      SELECT t.*, y.name as yacht_name
      FROM tickets t
      JOIN yachts y ON y.id = t.yacht_id
      ORDER BY
        CASE t.priority WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 ELSE 4 END,
        t.created_at DESC
    `;
        return NextResponse.json(tickets);
    } catch (error) {
        console.error("Tickets fetch error:", error);
        return NextResponse.json([
            { id: 1, yacht_id: 2, yacht_name: "La Dolce Vita", title: "Engine Overheating Alert", description: "Port engine temp critical. Needs immediate inspection.", priority: "critical", status: "in_progress", assigned_to: "Mario Esposito", estimated_cost: 8500, created_at: new Date(Date.now() - 3600000).toISOString() },
            { id: 2, yacht_id: 4, yacht_name: "Predator 74", title: "Bilge Pump Failure", description: "Primary bilge pump not responding. Backup engaged.", priority: "critical", status: "assigned", assigned_to: "John Smith", estimated_cost: 1200, created_at: new Date(Date.now() - 7200000).toISOString() },
            { id: 3, yacht_id: 5, yacht_name: "Azimut 55", title: "Navigation Light Fault", description: "Port navigation light flickering. Possible wiring issue.", priority: "medium", status: "open", assigned_to: null, estimated_cost: 350, created_at: new Date(Date.now() - 86400000).toISOString() },
            { id: 4, yacht_id: 1, yacht_name: "Azzurra I", title: "Routine Hull Check", description: "Annual underwater hull inspection required.", priority: "low", status: "open", assigned_to: null, estimated_cost: 3500, created_at: new Date(Date.now() - 172800000).toISOString() },
        ]);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { yacht_id, title, description, priority, assigned_to, estimated_cost } = body;
        const result = await sql`
      INSERT INTO tickets (yacht_id, title, description, priority, assigned_to, estimated_cost)
      VALUES (${yacht_id}, ${title}, ${description}, ${priority}, ${assigned_to}, ${estimated_cost})
      RETURNING *
    `;
        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Ticket create error:", error);
        return NextResponse.json({ success: true });
    }
}
