"use client";

import { useState, useEffect } from "react";

interface Props { yachts: any[] }

const SENSORS = [
    { key: "portEngineTemp", label: "Port Engine Temp", unit: "°C", warn: 88, crit: 95 },
    { key: "stbdEngineTemp", label: "Stbd Engine Temp", unit: "°C", warn: 88, crit: 95 },
    { key: "engineRpm", label: "Engine RPM", unit: "RPM", warn: 2800, crit: 3200 },
    { key: "batteryVoltage", label: "Battery Voltage", unit: "V", warn: 11.8, crit: 11.2 },
    { key: "fuelLevel", label: "Fuel Level", unit: "%", warn: 20, crit: 10 },
    { key: "bilgeLevel", label: "Bilge Level", unit: "%", warn: 30, crit: 70 },
    { key: "windSpeed", label: "Wind Speed", unit: "kn", warn: 30, crit: 45 },
    { key: "hullVibration", label: "Hull Vibration", unit: "g", warn: 0.8, crit: 1.2 },
];

const COMPONENTS = [
    { name: "Port Engine", type: "Propulsion" },
    { name: "Stbd Engine", type: "Propulsion" },
    { name: "Generator", type: "Electrical" },
    { name: "Navigation", type: "Electronics" },
    { name: "Hull", type: "Structural" },
    { name: "Bilge Pump", type: "Safety" },
];

function mockReadings(yachtId: number) {
    const seed = yachtId * 7;
    return {
        portEngineTemp: 72 + (seed % 25),
        stbdEngineTemp: 70 + ((seed * 3) % 22),
        engineRpm: 1200 + (seed * 97 % 1800),
        batteryVoltage: 13.2 + (seed % 10) / 10,
        fuelLevel: 40 + (seed * 13 % 55),
        bilgeLevel: 5 + (seed * 7 % 20),
        windSpeed: 8 + (seed * 11 % 22),
        hullVibration: parseFloat((0.1 + (seed * 3 % 8) / 10).toFixed(1)),
    };
}

function mockHealth(yachtId: number) {
    const seed = yachtId * 13;
    return COMPONENTS.map(c => ({
        ...c,
        health: Math.max(30, 95 - (seed * 7 + c.name.length * 3) % 45),
    }));
}

function healthColor(s: number) {
    if (s >= 80) return "var(--green)";
    if (s >= 60) return "var(--yellow)";
    return "var(--red)";
}

function sensorState(value: number, warn: number, crit: number, isLow = false) {
    if (isLow) {
        if (value <= crit) return "critical";
        if (value <= warn) return "warning";
        return "ok";
    }
    if (value >= crit) return "critical";
    if (value >= warn) return "warning";
    return "ok";
}

export default function DigitalTwinPanel({ yachts }: Props) {
    const [selectedId, setSelectedId] = useState<number>(yachts[0]?.id ?? 1);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 5000);
        return () => clearInterval(id);
    }, []);

    const yacht = yachts.find(y => y.id === selectedId) ?? yachts[0];
    if (!yacht) return <div style={{ padding: 32, color: "var(--text-3)" }}>No vessels found</div>;

    const readings = mockReadings(selectedId + tick);
    const components = mockHealth(selectedId);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Header */}
            <div>
                <h1 className="page-title">Digital Twin</h1>
                <p className="page-subtitle">Live vessel telemetry & component health</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 14, alignItems: "start" }}>

                {/* Vessel selector */}
                <div className="glass-card" style={{ overflow: "hidden" }}>
                    {yachts.map((y, i) => {
                        const hc = healthColor(y.health_score ?? 80);
                        const isActive = y.id === selectedId;
                        return (
                            <div
                                key={y.id}
                                onClick={() => setSelectedId(y.id)}
                                style={{
                                    padding: "11px 14px",
                                    borderBottom: i < yachts.length - 1 ? "1px solid var(--border)" : "none",
                                    cursor: "pointer",
                                    background: isActive ? "var(--bg-2)" : "",
                                    transition: "background var(--t)",
                                }}
                                onMouseEnter={e => !isActive && (e.currentTarget.style.background = "var(--bg-2)")}
                                onMouseLeave={e => !isActive && (e.currentTarget.style.background = "")}
                            >
                                <div style={{ fontSize: 13, fontWeight: isActive ? 600 : 500, color: isActive ? "var(--text-1)" : "var(--text-2)" }}>
                                    {y.name}
                                </div>
                                <div style={{ fontSize: 11, color: hc, marginTop: 2, fontWeight: 500 }}>
                                    {y.health_score ?? 80}%
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main panel */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                    {/* Vessel info */}
                    <div className="glass-card" style={{ padding: "16px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-1)" }}>{yacht.name}</span>
                                    <span className={`stat-badge ${yacht.status === "active" ? "badge-ok" : yacht.status === "maintenance" ? "badge-warn" : "badge-crit"}`}>
                                        {yacht.status}
                                    </span>
                                </div>
                                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
                                    {yacht.model} · {yacht.year} · {yacht.length_meters}m
                                </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: healthColor(yacht.health_score ?? 80) }}>
                                    {yacht.health_score ?? 80}%
                                </div>
                                <div style={{ fontSize: 11, color: "var(--text-3)" }}>Health</div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 24 }}>
                            {[
                                { l: "Engine Hours", v: `${parseFloat(yacht.engine_hours).toLocaleString()}h` },
                                { l: "Propulsion", v: yacht.engine_type },
                                { l: "Owner", v: yacht.owner_name },
                            ].map(i => (
                                <div key={i.l}>
                                    <div style={{ fontSize: 11, color: "var(--text-3)" }}>{i.l}</div>
                                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-1)", marginTop: 1 }}>{i.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live telemetry */}
                    <div className="glass-card" style={{ overflow: "hidden" }}>
                        <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
                            <span className="section-title">Live Telemetry</span>
                            <span style={{ fontSize: 11, color: "var(--text-3)", marginLeft: "auto" }}>updates every 5s</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
                            {SENSORS.map((s, i) => {
                                const val = (readings as any)[s.key];
                                const isLowWarn = ["fuelLevel", "batteryVoltage"].includes(s.key);
                                const state = sensorState(val, s.warn, s.crit, isLowWarn);
                                const color = state === "critical" ? "var(--red)" : state === "warning" ? "var(--yellow)" : "var(--text-1)";
                                const borderRight = (i + 1) % 4 !== 0 ? "1px solid var(--border)" : "none";
                                const borderBottom = i < 4 ? "1px solid var(--border)" : "none";
                                return (
                                    <div key={s.key} style={{ padding: "14px 16px", borderRight, borderBottom }}>
                                        <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 4 }}>{s.label}</div>
                                        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color }}>
                                            {typeof val === "number" && val % 1 !== 0 ? val.toFixed(1) : val}
                                            <span style={{ fontSize: 11, fontWeight: 400, color: "var(--text-3)", marginLeft: 3 }}>{s.unit}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Component health */}
                    <div className="glass-card" style={{ overflow: "hidden" }}>
                        <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)" }}>
                            <span className="section-title">Component Health</span>
                        </div>
                        <div style={{ padding: "8px 0" }}>
                            {components.map((c, i) => (
                                <div key={c.name} style={{
                                    display: "flex", alignItems: "center", gap: 14, padding: "10px 18px",
                                    borderBottom: i < components.length - 1 ? "1px solid var(--border)" : "none",
                                }}>
                                    <div style={{ width: 120, minWidth: 120 }}>
                                        <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                                        <div style={{ fontSize: 11, color: "var(--text-3)" }}>{c.type}</div>
                                    </div>
                                    <div className="health-bar-track" style={{ flex: 1 }}>
                                        <div className="health-bar-fill" style={{ width: `${c.health}%`, background: healthColor(c.health) }} />
                                    </div>
                                    <span style={{ width: 36, textAlign: "right", fontSize: 12, fontWeight: 600, color: healthColor(c.health) }}>
                                        {c.health}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
