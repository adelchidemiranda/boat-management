"use client";

import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";

interface Props {
    tickets: any[];
    yachts: any[];
    onRefresh: () => void;
}

const PRIORITY: Record<string, { label: string; cls: string }> = {
    critical: { label: "Critical", cls: "badge-crit" },
    high: { label: "High", cls: "badge-warn" },
    medium: { label: "Medium", cls: "badge-info" },
    low: { label: "Low", cls: "badge-ok" },
};

const STATUS: Record<string, { label: string; cls: string }> = {
    open: { label: "Open", cls: "badge-info" },
    assigned: { label: "Assigned", cls: "badge-warn" },
    in_progress: { label: "In Progress", cls: "badge-warn" },
    resolved: { label: "Resolved", cls: "badge-ok" },
};

export default function TicketsPanel({ tickets, yachts, onRefresh }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ yacht_id: "", title: "", priority: "medium", description: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!form.title || !form.yacht_id) return;
        setSubmitting(true);
        try {
            await fetch("/api/tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setForm({ yacht_id: "", title: "", priority: "medium", description: "" });
            setShowForm(false);
            onRefresh();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                    <h1 className="page-title">Smart Worker</h1>
                    <p className="page-subtitle">Service tickets and technician task management</p>
                </div>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    <Plus size={13} /> New Ticket
                </button>
            </div>

            {/* Create form */}
            {showForm && (
                <div className="glass-card animate-fadeIn" style={{ padding: "18px 20px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: "var(--text-1)" }}>Create Ticket</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                        <div>
                            <label className="form-label">Title</label>
                            <input className="form-input" placeholder="Issue title" value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                        </div>
                        <div>
                            <label className="form-label">Vessel</label>
                            <select className="form-input" value={form.yacht_id}
                                onChange={e => setForm(f => ({ ...f, yacht_id: e.target.value }))}>
                                <option value="">Select vessel…</option>
                                {yachts.map(y => <option key={y.id} value={y.id}>{y.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Priority</label>
                            <select className="form-input" value={form.priority}
                                onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <label className="form-label">Description</label>
                        <textarea className="form-input" rows={2} placeholder="Describe the issue…" value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            style={{ resize: "vertical" }} />
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? "Creating…" : "Create Ticket"}
                        </button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="glass-card animate-fadeInUp delay-100" style={{ overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="section-title">All Tickets</span>
                    <span style={{ fontSize: 11, color: "var(--text-3)" }}>{tickets.length} total</span>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Vessel</th>
                            <th>Assigned To</th>
                            <th>Cost Est.</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(t => {
                            const pc = PRIORITY[t.priority] ?? PRIORITY["medium"];
                            const sc = STATUS[t.status] ?? STATUS["open"];
                            return (
                                <tr key={t.id}>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{t.title}</div>
                                        {t.description && (
                                            <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 1, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {t.description}
                                            </div>
                                        )}
                                    </td>
                                    <td><span className="stat-badge badge-ocean">{t.yacht_name || "—"}</span></td>
                                    <td style={{ color: "var(--text-2)", fontSize: 12 }}>{t.assigned_to || "Unassigned"}</td>
                                    <td style={{ fontWeight: 500 }}>
                                        {t.estimated_cost ? `€${parseFloat(t.estimated_cost).toLocaleString()}` : "—"}
                                    </td>
                                    <td><span className={`stat-badge ${pc.cls}`}>{pc.label}</span></td>
                                    <td><span className={`stat-badge ${sc.cls}`}>{sc.label}</span></td>
                                    <td><ChevronRight size={13} color="var(--text-3)" /></td>
                                </tr>
                            );
                        })}
                        {tickets.length === 0 && (
                            <tr><td colSpan={7} style={{ padding: 32, textAlign: "center", color: "var(--text-3)" }}>No tickets</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
