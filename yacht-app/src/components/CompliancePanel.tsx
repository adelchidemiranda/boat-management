"use client";

import { FileCheck, AlertTriangle, CheckCircle, Clock, FileText, Shield, Anchor, Upload, ChevronRight } from "lucide-react";

interface Props { yachts: any[] }

const DOCS = [
    { yacht_id: 1, yacht_name: "Azzurra I", type: "Safety Equipment Certificate", category: "safety", expiry: "2026-06-15", status: "valid" },
    { yacht_id: 2, yacht_name: "La Dolce Vita", type: "Marine Insurance Policy", category: "insurance", expiry: "2026-03-01", status: "expiring" },
    { yacht_id: 3, yacht_name: "Ferretti 780", type: "Navigation License", category: "license", expiry: "2027-01-01", status: "valid" },
    { yacht_id: 4, yacht_name: "Predator 74", type: "Fire Safety Certificate", category: "safety", expiry: "2025-12-31", status: "expired" },
    { yacht_id: 1, yacht_name: "Azzurra I", type: "Engine Warranty — Volvo IPS", category: "warranty", expiry: "2026-12-31", status: "valid" },
    { yacht_id: 5, yacht_name: "Azimut 55", type: "Survey Certificate", category: "survey", expiry: "2026-04-20", status: "expiring" },
    { yacht_id: 3, yacht_name: "Ferretti 780", type: "EPIRB Registration", category: "safety", expiry: "2026-09-15", status: "valid" },
    { yacht_id: 2, yacht_name: "La Dolce Vita", type: "Crew Certification", category: "crew", expiry: "2026-05-30", status: "valid" },
];

const STATUS_CFG: Record<string, { cls: string; label: string }> = {
    valid: { cls: "badge-ok", label: "Valid" },
    expiring: { cls: "badge-warn", label: "Expiring" },
    expired: { cls: "badge-crit", label: "Expired" },
};

function daysUntil(d: string) {
    return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);
}

export default function CompliancePanel({ yachts }: Props) {
    const expired = DOCS.filter(d => d.status === "expired");
    const expiring = DOCS.filter(d => d.status === "expiring");
    const valid = DOCS.filter(d => d.status === "valid");
    const rate = Math.round((valid.length / DOCS.length) * 100);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                    <h1 className="page-title">Compliance</h1>
                    <p className="page-subtitle">Certifications, licenses and regulatory renewals</p>
                </div>
                <button className="btn-primary"><Upload size={13} /> Upload Document</button>
            </div>

            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {[
                    { label: "Expired", value: expired.length, color: "var(--red)" },
                    { label: "Expiring Soon", value: expiring.length, color: "var(--yellow)" },
                    { label: "Compliance Rate", value: `${rate}%`, color: "var(--green)" },
                ].map(k => (
                    <div key={k.label} className="kpi-card">
                        <div className="kpi-value" style={{ color: k.color, fontSize: 26 }}>{k.value}</div>
                        <div className="kpi-label">{k.label}</div>
                    </div>
                ))}
            </div>

            {/* Action required */}
            {(expired.length > 0 || expiring.length > 0) && (
                <div className="critical-banner animate-fadeIn">
                    <AlertTriangle size={14} color="var(--red)" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Action Required</div>
                        {[...expired, ...expiring].map((d, i) => {
                            const days = daysUntil(d.expiry);
                            const color = d.status === "expired" ? "var(--red)" : "var(--yellow)";
                            return (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "8px 0",
                                    borderTop: i > 0 ? "1px solid var(--border)" : "none",
                                }}>
                                    <div>
                                        <span style={{ fontSize: 13, fontWeight: 500 }}>{d.type}</span>
                                        <span style={{ fontSize: 12, color: "var(--text-3)", marginLeft: 6 }}>— {d.yacht_name}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <span style={{ fontSize: 12, color, fontWeight: 500 }}>
                                            {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
                                        </span>
                                        <button className="btn-ghost" style={{ fontSize: 11, padding: "4px 8px" }}>Renew</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Full table */}
            <div className="glass-card animate-fadeInUp delay-200" style={{ overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="section-title">All Documents</span>
                    <span style={{ fontSize: 11, color: "var(--text-3)" }}>{DOCS.length} total</span>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Vessel</th>
                            <th>Category</th>
                            <th>Expiry</th>
                            <th>Days Left</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {DOCS.map((d, i) => {
                            const sc = STATUS_CFG[d.status] ?? STATUS_CFG.valid;
                            const days = daysUntil(d.expiry);
                            const dayColor = days < 0 ? "var(--red)" : days <= 60 ? "var(--yellow)" : "var(--green)";
                            return (
                                <tr key={i}>
                                    <td style={{ fontWeight: 500 }}>{d.type}</td>
                                    <td><span className="stat-badge badge-ocean">{d.yacht_name}</span></td>
                                    <td style={{ color: "var(--text-2)", fontSize: 12, textTransform: "capitalize" }}>{d.category}</td>
                                    <td style={{ color: "var(--text-2)", fontSize: 12 }}>{d.expiry}</td>
                                    <td>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: dayColor }}>
                                            {days < 0 ? `${Math.abs(days)}d` : `${days}d`}
                                        </span>
                                    </td>
                                    <td><span className={`stat-badge ${sc.cls}`}>{sc.label}</span></td>
                                    <td><ChevronRight size={13} color="var(--text-3)" /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
