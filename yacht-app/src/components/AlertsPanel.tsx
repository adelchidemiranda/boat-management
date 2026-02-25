"use client";

import { useState } from "react";
import { RefreshCw, CheckCircle } from "lucide-react";

interface Props {
    alerts: any[];
    onRefresh: () => void;
}

const TYPES = ["all", "critical", "warning", "info"] as const;

const TYPE_COLOR: Record<string, string> = {
    critical: "var(--red)",
    warning: "var(--yellow)",
    info: "var(--blue)",
};

const AI_RECS: Record<string, { text: string; cost: string }> = {
    critical: { text: "Schedule immediate inspection within 24h. Dispatch certified marine engineer.", cost: "€800–2,400" },
    warning: { text: "Monitor closely. Schedule preventive service within 7 days.", cost: "€200–600" },
    info: { text: "Log for next scheduled service. No immediate action required.", cost: "€0–150" },
};

function timeAgo(d: string) {
    const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
}

export default function AlertsPanel({ alerts, onRefresh }: Props) {
    const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
    const [expanded, setExpanded] = useState<number | null>(null);
    const [resolving, setResolving] = useState<number | null>(null);

    const filtered = filter === "all" ? alerts : alerts.filter(a => a.type === filter);

    const handleResolve = async (id: number) => {
        setResolving(id);
        try {
            await fetch("/api/alerts", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            onRefresh();
        } finally {
            setResolving(null);
        }
    };

    const counts = {
        all: alerts.length,
        critical: alerts.filter(a => a.type === "critical").length,
        warning: alerts.filter(a => a.type === "warning").length,
        info: alerts.filter(a => a.type === "info").length,
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                    <h1 className="page-title">Alerts</h1>
                    <p className="page-subtitle">AI-generated predictive maintenance alerts</p>
                </div>
                <button className="btn-ghost" onClick={onRefresh}>
                    <RefreshCw size={13} /> Refresh
                </button>
            </div>

            {/* Summary row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {TYPES.map(t => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        style={{
                            background: filter === t ? "var(--bg-2)" : "var(--bg-1)",
                            border: `1px solid ${filter === t ? "var(--border-strong)" : "var(--border)"}`,
                            borderRadius: "var(--r-xl)",
                            padding: "14px 16px",
                            cursor: "pointer",
                            textAlign: "left",
                            fontFamily: "inherit",
                            transition: "all var(--t)",
                        }}
                    >
                        <div style={{
                            fontSize: 22,
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            color: t === "all" ? "var(--text-1)" : TYPE_COLOR[t],
                        }}>
                            {counts[t]}
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 500, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>
                            {t}
                        </div>
                    </button>
                ))}
            </div>

            {/* Alert list */}
            <div className="glass-card animate-fadeInUp delay-100" style={{ overflow: "hidden" }}>
                {filtered.length === 0 ? (
                    <div style={{ padding: "48px 24px", textAlign: "center" }}>
                        <CheckCircle size={24} color="var(--green)" style={{ marginBottom: 8 }} />
                        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-1)" }}>All clear</div>
                        <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>No {filter !== "all" ? filter : ""} alerts</div>
                    </div>
                ) : filtered.map((a, i) => {
                    const isOpen = expanded === a.id;
                    const dot = TYPE_COLOR[a.type] ?? "var(--blue)";
                    const rec = AI_RECS[a.type] ?? AI_RECS["info"];
                    return (
                        <div
                            key={a.id}
                            style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}
                        >
                            {/* Row */}
                            <div
                                style={{
                                    display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                                    cursor: "pointer", transition: "background var(--t)",
                                }}
                                onClick={() => setExpanded(isOpen ? null : a.id)}
                                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-2)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "")}
                            >
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-1)" }}>{a.message}</div>
                                    <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>
                                        {a.yacht_name} · {a.component} · {timeAgo(a.created_at)}
                                    </div>
                                </div>
                                <span className={`stat-badge ${a.type === "critical" ? "badge-crit" : a.type === "warning" ? "badge-warn" : "badge-info"}`}>
                                    {a.type}
                                </span>
                            </div>

                            {/* Expanded AI recommendation */}
                            {isOpen && (
                                <div style={{
                                    background: "var(--bg-2)",
                                    borderTop: "1px solid var(--border)",
                                    padding: "14px 18px 14px 38px",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                        <span className="ai-badge">AI Recommendation</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: "var(--text-1)", lineHeight: 1.6, marginBottom: 10 }}>
                                        {rec.text}
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div style={{ fontSize: 12, color: "var(--text-3)" }}>
                                            Est. cost: <span style={{ color: "var(--text-1)", fontWeight: 500 }}>{rec.cost}</span>
                                        </div>
                                        <button
                                            className="btn-primary"
                                            style={{ fontSize: 12, padding: "6px 12px" }}
                                            disabled={resolving === a.id}
                                            onClick={e => { e.stopPropagation(); handleResolve(a.id); }}
                                        >
                                            {resolving === a.id ? "Resolving…" : "Mark Resolved"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
