"use client";

import { useState } from "react";
import { Plus, User, ChevronRight } from "lucide-react";
import CallOperatorButton from "./CallOperatorButton";

interface Props { records: any[] }

const STATUS: Record<string, { label: string; cls: string }> = {
    completed: { label: "Completed", cls: "badge-ok" },
    in_progress: { label: "In Progress", cls: "badge-warn" },
    scheduled: { label: "Scheduled", cls: "badge-info" },
};

function fmtDate(s?: string) {
    if (!s) return "—";
    try { return new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return s; }
}

export default function MaintenancePanel({ records }: Props) {
    const completed = records.filter(r => r.status === "completed").length;
    const inProgress = records.filter(r => r.status === "in_progress").length;
    const scheduled = records.filter(r => r.status === "scheduled").length;
    const totalCost = records.reduce((s, r) => s + parseFloat(r.cost || "0"), 0);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                    <h1 className="page-title">Maintenance</h1>
                    <p className="page-subtitle">Service history, job tracking and cost management</p>
                </div>
                <button className="btn-primary"><Plus size={13} /> New Job</button>
            </div>

            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {[
                    { label: "Scheduled", value: scheduled, color: "var(--blue)" },
                    { label: "In Progress", value: inProgress, color: "var(--yellow)" },
                    { label: "Completed", value: completed, color: "var(--green)" },
                    { label: "Total Cost", value: `€${(totalCost / 1000).toFixed(1)}k`, color: "var(--text-1)" },
                ].map(k => (
                    <div key={k.label} className="kpi-card">
                        <div className="kpi-value" style={{ color: k.color, fontSize: 26 }}>{k.value}</div>
                        <div className="kpi-label">{k.label}</div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="glass-card animate-fadeInUp delay-100" style={{ overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="section-title">All Records</span>
                    <span style={{ fontSize: 11, color: "var(--text-3)" }}>{records.length} total</span>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Vessel</th>
                            <th>Technician</th>
                            <th>Scheduled</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(r => {
                            const cfg = STATUS[r.status] ?? { label: r.status, cls: "badge-info" };
                            return (
                                <tr key={r.id}>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{r.type}</div>
                                        {r.description && (
                                            <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 1, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {r.description}
                                            </div>
                                        )}
                                    </td>
                                    <td><span className="stat-badge badge-ocean">{r.yacht_name || "—"}</span></td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                            <User size={11} color="var(--text-3)" />
                                            <span style={{ color: "var(--text-2)", fontSize: 12 }}>{r.technician || "Unassigned"}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: "var(--text-2)", fontSize: 12 }}>{fmtDate(r.scheduled_date)}</td>
                                    <td style={{ fontWeight: 500 }}>{r.cost > 0 ? `€${parseFloat(r.cost).toLocaleString()}` : "—"}</td>
                                    <td><span className={`stat-badge ${cfg.cls}`}>{cfg.label}</span></td>
                                    <td style={{ textAlign: "right" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                                            <CallOperatorButton />
                                            <ChevronRight size={13} color="var(--text-3)" />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {records.length === 0 && (
                            <tr><td colSpan={7} style={{ padding: 32, textAlign: "center", color: "var(--text-3)" }}>No records</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
