"use client";

import { Sparkles, ChevronRight, AlertTriangle, Wrench, FileCheck, Clock } from "lucide-react";
import CallOperatorButton from "./CallOperatorButton";

interface Priority {
    id: string;
    type: "critical" | "maintenance" | "compliance" | "scheduled";
    title: string;
    vessel: string;
    action: string;
    timeframe: string;
    urgent: boolean;
}

function buildPriorities(alerts: any[], maintenance: any[], tickets: any[]): Priority[] {
    const priorities: Priority[] = [];

    // Critical alerts → top priority
    const criticalAlerts = alerts.filter((a) => a.type === "critical").slice(0, 2);
    criticalAlerts.forEach((a) => {
        priorities.push({
            id: `alert-${a.id}`,
            type: "critical",
            title: a.message,
            vessel: a.yacht_name,
            action: "Inspect immediately",
            timeframe: "Now",
            urgent: true,
        });
    });

    // In-progress maintenance
    maintenance
        .filter((m) => m.status === "in_progress")
        .slice(0, 1)
        .forEach((m) => {
            priorities.push({
                id: `maint-${m.id}`,
                type: "maintenance",
                title: m.type || m.description,
                vessel: m.yacht_name,
                action: "Update job status",
                timeframe: "Today",
                urgent: false,
            });
        });

    // Overdue tickets
    tickets
        .filter((t) => t.priority === "high" && t.status === "open")
        .slice(0, 1)
        .forEach((t) => {
            priorities.push({
                id: `ticket-${t.id}`,
                type: "maintenance",
                title: t.title,
                vessel: t.yacht_name,
                action: "Assign technician",
                timeframe: "Today",
                urgent: false,
            });
        });

    // Scheduled maintenance within 7 days
    maintenance
        .filter((m) => m.status === "scheduled")
        .slice(0, 1)
        .forEach((m) => {
            priorities.push({
                id: `sched-${m.id}`,
                type: "scheduled",
                title: m.type || m.description,
                vessel: m.yacht_name,
                action: "Confirm technician",
                timeframe: "This week",
                urgent: false,
            });
        });

    return priorities.slice(0, 4);
}

const typeConfig = {
    critical: { icon: AlertTriangle, color: "var(--status-crit)", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.18)" },
    maintenance: { icon: Wrench, color: "var(--status-warn)", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.15)" },
    compliance: { icon: FileCheck, color: "var(--ocean)", bg: "var(--ocean-glow)", border: "var(--border-ocean)" },
    scheduled: { icon: Clock, color: "var(--status-info)", bg: "rgba(56,189,248,0.06)", border: "rgba(56,189,248,0.15)" },
};

interface Props {
    alerts: any[];
    maintenance: any[];
    tickets: any[];
    onNavigate: (view: string) => void;
}

export default function TodaysPriorities({ alerts, maintenance, tickets, onNavigate }: Props) {
    const priorities = buildPriorities(alerts, maintenance, tickets);
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

    if (priorities.length === 0) return null;

    return (
        <div className="ai-card animate-fadeInUp" style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span className="ai-badge">
                            <Sparkles size={9} />
                            AI Summary
                        </span>
                        <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{dateStr}</span>
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                        {greeting} — {priorities.filter(p => p.urgent).length > 0
                            ? `${priorities.filter(p => p.urgent).length} critical item${priorities.filter(p => p.urgent).length > 1 ? "s" : ""} need your attention`
                            : `${priorities.length} tasks on your radar today`}
                    </div>
                </div>
                <button
                    className="btn-ghost"
                    onClick={() => onNavigate("alerts")}
                    style={{ fontSize: 12 }}
                >
                    View all <ChevronRight size={12} />
                </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {priorities.map((p, i) => {
                    const cfg = typeConfig[p.type];
                    const Icon = cfg.icon;
                    return (
                        <div
                            key={p.id}
                            className={`priority-item ${p.urgent ? "urgent" : ""} animate-fadeInUp`}
                            style={{
                                animationDelay: `${i * 60}ms`,
                                borderColor: p.urgent ? "rgba(239,68,68,0.2)" : "var(--border-subtle)",
                                background: p.urgent ? "rgba(239,68,68,0.04)" : "var(--depth-4)",
                            }}
                            onClick={() => onNavigate(p.type === "maintenance" ? "maintenance" : p.type === "compliance" ? "compliance" : "alerts")}
                        >
                            <div
                                style={{
                                    width: 34,
                                    height: 34,
                                    borderRadius: 10,
                                    background: cfg.bg,
                                    border: `1px solid ${cfg.border}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <Icon size={15} color={cfg.color} strokeWidth={2.5} />
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {p.title}
                                </div>
                                <div style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 1 }}>
                                    {p.vessel} · {p.action}
                                </div>
                            </div>

                            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
                                {(p.type === "critical" || p.type === "maintenance") && (
                                    <CallOperatorButton />
                                )}
                                <span
                                    className="stat-badge"
                                    style={{
                                        background: cfg.bg,
                                        color: cfg.color,
                                        border: `1px solid ${cfg.border}`,
                                        fontSize: 10,
                                    }}
                                >
                                    {p.timeframe}
                                </span>
                                <ChevronRight size={13} color="var(--text-tertiary)" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
