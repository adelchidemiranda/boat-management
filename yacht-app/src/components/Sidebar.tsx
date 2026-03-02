"use client";

import { useState } from "react";
import {
    LayoutDashboard, Bell, Cpu, Wrench, Users, FileCheck,
    BarChart2, Anchor, Settings, ChevronLeft, ChevronRight,
} from "lucide-react";
import AICallButton from "./AICallButton";

const NAV = [
    {
        group: "Monitor",
        items: [
            { id: "dashboard", label: "Fleet Overview", icon: LayoutDashboard },
            { id: "alerts", label: "AI Alerts", icon: Bell },
            { id: "twin", label: "Digital Twin", icon: Cpu },
        ],
    },
    {
        group: "Operations",
        items: [
            { id: "maintenance", label: "Maintenance", icon: Wrench },
            { id: "smartworker", label: "Smart Worker", icon: Users },
            { id: "compliance", label: "Compliance", icon: FileCheck },
        ],
    },
    {
        group: "Insights",
        items: [
            { id: "analytics", label: "Analytics", icon: BarChart2 },
        ],
    },
];

interface Props {
    active: string;
    onNavigate: (id: string) => void;
    alertCount: number;
}

export default function Sidebar({ active, onNavigate, alertCount }: Props) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <nav className={`sidebar${collapsed ? " collapsed" : ""}`}>
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-logo">
                    <Anchor size={14} color="white" />
                </div>
                {!collapsed && (
                    <div style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sidebar-text-act)", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
                            YachtSense
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        marginLeft: "auto", flexShrink: 0,
                        width: 24, height: 24,
                        background: "transparent", border: "none",
                        cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                >
                    {collapsed
                        ? <ChevronRight size={13} color="var(--sidebar-text)" />
                        : <ChevronLeft size={13} color="var(--sidebar-text)" />
                    }
                </button>
            </div>

            {/* Nav */}
            <div className="sidebar-nav">
                {NAV.map(({ group, items }) => (
                    <div key={group}>
                        {!collapsed && (
                            <div className="sidebar-section-title">{group}</div>
                        )}
                        {items.map(({ id, label, icon: Icon }) => {
                            const isActive = active === id;
                            const isBell = id === "alerts";
                            return (
                                <div
                                    key={id}
                                    className={`nav-item${isActive ? " active" : ""}`}
                                    onClick={() => onNavigate(id)}
                                    title={collapsed ? label : undefined}
                                >
                                    <div className="nav-icon">
                                        <Icon
                                            size={15}
                                            color={isActive ? "var(--sidebar-text-act)" : "var(--sidebar-text)"}
                                        />
                                    </div>
                                    {!collapsed && (
                                        <span style={{ flex: 1, fontSize: 13 }}>{label}</span>
                                    )}
                                    {!collapsed && isBell && alertCount > 0 && (
                                        <span className="nav-badge">{alertCount}</span>
                                    )}
                                </div>
                            );
                        })}
                        {!collapsed && <div style={{ height: 4 }} />}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="sidebar-footer">
                {!collapsed && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", marginBottom: 6 }}>
                        <div className="iot-dot" />
                        <span style={{ fontSize: 11, color: "var(--sidebar-text)" }}>IoT Connected</span>
                    </div>
                )}

                {/* AI Call Button */}
                <div style={{ marginBottom: 8, padding: collapsed ? "0 4px" : "0" }}>
                    <AICallButton variant="sidebar" collapsed={collapsed} />
                </div>

                <div className="sidebar-user" onClick={() => onNavigate("settings")}>
                    <div className="user-avatar">AZ</div>
                    {!collapsed && (
                        <div style={{ overflow: "hidden", flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sidebar-text-act)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                Azimut Yachts
                            </div>
                            <div style={{ fontSize: 11, color: "var(--sidebar-text)" }}>Enterprise</div>
                        </div>
                    )}
                    {!collapsed && <Settings size={13} color="var(--sidebar-text)" />}
                </div>
            </div>
        </nav>
    );
}
