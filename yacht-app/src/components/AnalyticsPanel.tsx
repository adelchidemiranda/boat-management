"use client";

import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

interface Props {
    yachts: any[];
    maintenance: any[];
    alerts: any[];
}

// Mock time-series for fleet health trend
const fleetHealthTrend = [
    { month: "Sep", health: 88 },
    { month: "Oct", health: 85 },
    { month: "Nov", health: 82 },
    { month: "Dec", health: 79 },
    { month: "Jan", health: 76 },
    { month: "Feb", health: 80 },
];

const failureByComponent = [
    { name: "Engine", failures: 14, color: "#ef4444" },
    { name: "Electrical", failures: 9, color: "#f59e0b" },
    { name: "HVAC", failures: 6, color: "#38bdf8" },
    { name: "Pumps", failures: 11, color: "#8b5cf6" },
    { name: "Hull", failures: 3, color: "#10b981" },
    { name: "Navigation", failures: 5, color: "#06b6d4" },
];

const costByMonth = [
    { month: "Sep", cost: 12400, prevented: 34000 },
    { month: "Oct", cost: 8900, prevented: 29000 },
    { month: "Nov", cost: 15600, prevented: 41000 },
    { month: "Dec", cost: 6200, prevented: 22000 },
    { month: "Jan", cost: 9800, prevented: 31000 },
    { month: "Feb", cost: 11200, prevented: 38000 },
];

const alertsByType = [
    { name: "Critical", value: 8, color: "#ef4444" },
    { name: "Warning", value: 23, color: "#f59e0b" },
    { name: "Info", value: 15, color: "#38bdf8" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div
            className="px-3 py-2 rounded-xl text-xs"
            style={{
                background: "#0a0f1e",
                border: "1px solid rgba(56,189,248,0.2)",
                backdropFilter: "blur(20px)",
            }}
        >
            <div className="font-semibold text-white mb-1">{label}</div>
            {payload.map((p: any) => (
                <div key={p.name} style={{ color: p.color }}>
                    {p.name}: {typeof p.value === "number" && p.value > 1000 ? `€${p.value.toLocaleString()}` : p.value}
                    {p.name === "health" ? "%" : ""}
                </div>
            ))}
        </div>
    );
};

function MetricCard({ label, value, delta, positive }: { label: string; value: string; delta: string; positive: boolean }) {
    return (
        <div className="glass-card p-5">
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#475569" }}>{label}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
                {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {delta} vs last month
            </div>
        </div>
    );
}

export default function AnalyticsPanel({ yachts, maintenance, alerts }: Props) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Fleet Analytics</h1>
                <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
                    Reliability insights, failure heatmaps and ROI tracking for shipyard teams
                </p>
            </div>

            {/* Top KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard label="Fleet Health Score" value="80%" delta="+4%" positive={true} />
                <MetricCard label="MTBF" value="847h" delta="+62h" positive={true} />
                <MetricCard label="MTTR" value="4.2h" delta="-1.1h" positive={true} />
                <MetricCard label="Failures Prevented" value="€195K" delta="+€23K" positive={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Fleet Health Trend */}
                <div className="glass-card p-5">
                    <div className="text-sm font-semibold text-white mb-4">Fleet Health Trend (6 months)</div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={fleetHealthTrend}>
                            <defs>
                                <linearGradient id="gradHealth" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis domain={[70, 95]} tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="health"
                                stroke="#38bdf8"
                                strokeWidth={2}
                                fill="url(#gradHealth)"
                                dot={{ fill: "#38bdf8", r: 4, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Maintenance Cost vs Prevented Cost */}
                <div className="glass-card p-5">
                    <div className="text-sm font-semibold text-white mb-4">Maintenance Cost vs Failures Prevented (€)</div>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={costByMonth} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="cost" name="Maintenance Cost" fill="#ef4444" opacity={0.8} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="prevented" name="Value Prevented" fill="#10b981" opacity={0.8} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Failure heatmap by component */}
                <div className="glass-card p-5">
                    <div className="text-sm font-semibold text-white mb-4">Failure Heatmap by Component</div>
                    <div className="space-y-3">
                        {failureByComponent
                            .sort((a, b) => b.failures - a.failures)
                            .map((c) => (
                                <div key={c.name}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs" style={{ color: "#94a3b8" }}>{c.name}</span>
                                        <span className="text-xs font-bold" style={{ color: c.color }}>{c.failures} failures</span>
                                    </div>
                                    <div className="health-bar">
                                        <div
                                            className="health-bar-fill"
                                            style={{
                                                width: `${(c.failures / 15) * 100}%`,
                                                background: c.color,
                                                opacity: 0.85,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Alert distribution pie */}
                <div className="glass-card p-5">
                    <div className="text-sm font-semibold text-white mb-4">Alert Distribution (Last 30 Days)</div>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={alertsByType}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {alertsByType.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} opacity={0.85} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                formatter={(value) => (
                                    <span style={{ color: "#94a3b8", fontSize: 12 }}>{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Per-yacht analytics */}
            <div className="glass-card overflow-hidden">
                <div className="px-5 py-4 border-b font-semibold text-white" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
                    Yacht Performance Comparison
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Vessel</th>
                                <th>Model</th>
                                <th>Engine Hours</th>
                                <th>Health Score</th>
                                <th>Active Alerts</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {yachts.map((y) => (
                                <tr key={y.id}>
                                    <td className="font-medium text-white">{y.name}</td>
                                    <td className="text-slate-400">{y.model}</td>
                                    <td>
                                        <span className={`font-medium ${y.engine_hours > 2000 ? "text-amber-400" : "text-slate-300"}`}>
                                            {y.engine_hours?.toLocaleString()}h
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="health-bar flex-1 min-w-16">
                                                <div
                                                    className="health-bar-fill"
                                                    style={{
                                                        width: `${y.health_score}%`,
                                                        background:
                                                            y.health_score >= 85
                                                                ? "linear-gradient(90deg, #10b981, #34d399)"
                                                                : y.health_score >= 65
                                                                    ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                                                                    : "linear-gradient(90deg, #ef4444, #f87171)",
                                                    }}
                                                />
                                            </div>
                                            <span className={`text-sm font-bold ${y.health_score >= 85 ? "text-emerald-400" : y.health_score >= 65 ? "text-amber-400" : "text-red-400"}`}>
                                                {y.health_score}%
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`font-medium ${y.active_alerts > 0 ? "text-amber-400" : "text-slate-500"}`}>
                                            {y.active_alerts ?? 0}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`stat-badge ${y.status === "active" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-amber-400 bg-amber-400/10 border-amber-400/20"}`}>
                                            {y.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
