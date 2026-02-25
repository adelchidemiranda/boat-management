"use client";

import { RefreshCw, ChevronRight, AlertTriangle, Wrench, CheckCircle } from "lucide-react";

interface Props {
    stats: any;
    yachts: any[];
    alerts: any[];
    records: any[];
    onNavigate: (id: string) => void;
    onRefresh: () => void;
}

function healthColor(s: number) {
    if (s >= 85) return "var(--green)";
    if (s >= 65) return "var(--yellow)";
    return "var(--red)";
}

function statusLabel(s: string) {
    if (s === "active") return { label: "Active", cls: "badge-ok" };
    if (s === "maintenance") return { label: "Maintenance", cls: "badge-warn" };
    return { label: "Offline", cls: "badge-crit" };
}

export default function FleetOverview({ stats, yachts, alerts, records, onNavigate, onRefresh }: Props) {
    const criticalAlerts = alerts.filter(a => a.type === "critical");
    const openMaintenance = records.filter(r => r.status !== "completed");
    const avgHealth = yachts.length
        ? Math.round(yachts.reduce((s, y) => s + (y.health_score ?? 80), 0) / yachts.length)
        : 0;

    const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                    <h1 className="page-title">Fleet Overview</h1>
                    <p className="page-subtitle">{today}</p>
                </div>
                <button className="btn-ghost" onClick={onRefresh} style={{ gap: 6 }}>
                    <RefreshCw size={13} />
                    Refresh
                </button>
            </div>

            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {[
                    { label: "Fleet Health", value: `${avgHealth}%`, sub: `${yachts.length} vessels`, color: healthColor(avgHealth) },
                    { label: "Active Alerts", value: stats?.activeAlerts ?? alerts.length, sub: `${criticalAlerts.length} critical`, color: criticalAlerts.length > 0 ? "var(--red)" : "var(--text-1)" },
                    { label: "Open Jobs", value: openMaintenance.length, sub: "maintenance", color: "var(--text-1)" },
                    { label: "Vessels Active", value: (stats?.activeVessels ?? yachts.filter(y => y.status === "active").length), sub: `of ${yachts.length} total`, color: "var(--text-1)" },
                ].map((k, i) => (
                    <div key={k.label} className={`kpi-card animate-fadeInUp delay-${(i + 1) * 50}`}>
                        <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
                        <div className="kpi-label">{k.label}</div>
                        <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 6 }}>{k.sub}</div>
                    </div>
                ))}
            </div>

            {/* Critical alerts inline — only if any */}
            {criticalAlerts.length > 0 && (
                <div className="critical-banner animate-fadeInUp delay-200">
                    <AlertTriangle size={15} color="var(--red)" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 13, color: "var(--text-1)" }}>
                        <span style={{ fontWeight: 600 }}>{criticalAlerts.length} critical alert{criticalAlerts.length > 1 ? "s" : ""}</span>
                        <span style={{ color: "var(--text-2)", marginLeft: 6 }}>
                            — {criticalAlerts.slice(0, 2).map(a => a.yacht_name).join(", ")}
                        </span>
                    </div>
                    <button className="btn-ghost" style={{ fontSize: 12, padding: "5px 10px" }} onClick={() => onNavigate("alerts")}>
                        View Alerts <ChevronRight size={12} />
                    </button>
                </div>
            )}

            {/* Fleet table */}
            <div className="glass-card animate-fadeInUp delay-250" style={{ overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="section-title">Vessels</span>
                    <span style={{ fontSize: 11, color: "var(--text-3)" }}>{yachts.length} total</span>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Model</th>
                            <th>Owner</th>
                            <th>Engine Hrs</th>
                            <th>Health</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {yachts.map(y => {
                            const st = statusLabel(y.status);
                            const hc = healthColor(y.health_score ?? 80);
                            return (
                                <tr key={y.id} style={{ cursor: "pointer" }} onClick={() => onNavigate("twin")}>
                                    <td style={{ fontWeight: 600 }}>{y.name}</td>
                                    <td style={{ color: "var(--text-2)", fontSize: 12 }}>{y.model}</td>
                                    <td style={{ color: "var(--text-2)", fontSize: 12 }}>{y.owner_name || "—"}</td>
                                    <td style={{ color: "var(--text-2)", fontSize: 12, fontVariantNumeric: "tabular-nums" }}>
                                        {parseFloat(y.engine_hours).toLocaleString()}h
                                    </td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <div className="health-bar-track" style={{ width: 56 }}>
                                                <div className="health-bar-fill" style={{
                                                    width: `${y.health_score ?? 80}%`,
                                                    background: hc,
                                                }} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: hc }}>
                                                {y.health_score ?? 80}%
                                            </span>
                                        </div>
                                    </td>
                                    <td><span className={`stat-badge ${st.cls}`}>{st.label}</span></td>
                                    <td><ChevronRight size={13} color="var(--text-3)" /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Bottom row: pending maintenance + recent alerts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

                {/* Pending jobs */}
                <div className="glass-card animate-fadeInUp delay-300" style={{ overflow: "hidden" }}>
                    <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span className="section-title">Pending Jobs</span>
                        <button className="btn-ghost" style={{ fontSize: 11, padding: "4px 8px" }} onClick={() => onNavigate("maintenance")}>
                            View all
                        </button>
                    </div>
                    <div style={{ padding: "8px 0" }}>
                        {openMaintenance.length === 0 ? (
                            <div style={{ padding: "20px 18px", color: "var(--text-3)", fontSize: 12 }}>No pending jobs</div>
                        ) : openMaintenance.slice(0, 4).map((r: any) => (
                            <div key={r.id} style={{
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "10px 18px",
                                borderBottom: "1px solid var(--border)",
                            }}>
                                <Wrench size={13} color="var(--text-3)" style={{ flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {r.type}
                                    </div>
                                    <div style={{ fontSize: 11, color: "var(--text-3)" }}>{r.yacht_name}</div>
                                </div>
                                <span className={`stat-badge ${r.status === "in_progress" ? "badge-warn" : "badge-info"}`}>
                                    {r.status === "in_progress" ? "In Progress" : "Scheduled"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent alerts */}
                <div className="glass-card animate-fadeInUp delay-350" style={{ overflow: "hidden" }}>
                    <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span className="section-title">Recent Alerts</span>
                        <button className="btn-ghost" style={{ fontSize: 11, padding: "4px 8px" }} onClick={() => onNavigate("alerts")}>
                            View all
                        </button>
                    </div>
                    <div style={{ padding: "8px 0" }}>
                        {alerts.length === 0 ? (
                            <div style={{ padding: "20px 18px", color: "var(--text-3)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                                <CheckCircle size={13} color="var(--green)" /> All clear
                            </div>
                        ) : alerts.slice(0, 4).map((a: any) => (
                            <div key={a.id} style={{
                                display: "flex", alignItems: "flex-start", gap: 12,
                                padding: "10px 18px",
                                borderBottom: "1px solid var(--border)",
                            }}>
                                <div style={{
                                    width: 6, height: 6, borderRadius: "50%", marginTop: 4, flexShrink: 0,
                                    background: a.type === "critical" ? "var(--red)" : a.type === "warning" ? "var(--yellow)" : "var(--blue)",
                                }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {a.message}
                                    </div>
                                    <div style={{ fontSize: 11, color: "var(--text-3)" }}>{a.yacht_name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
