"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import FleetOverview from "@/components/FleetOverview";
import AlertsPanel from "@/components/AlertsPanel";
import MaintenancePanel from "@/components/MaintenancePanel";
import DigitalTwinPanel from "@/components/DigitalTwinPanel";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import TicketsPanel from "@/components/TicketsPanel";
import CompliancePanel from "@/components/CompliancePanel";

export type ActiveView =
  | "dashboard" | "alerts" | "maintenance" | "twin"
  | "analytics" | "smartworker" | "compliance";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [stats, setStats] = useState<Record<string, any> | null>(null);
  const [yachts, setYachts] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [maintenance, setMaintenance] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [s, y, a, m, t] = await Promise.all([
        fetch("/api/stats").then(r => r.json()),
        fetch("/api/yachts").then(r => r.json()),
        fetch("/api/alerts").then(r => r.json()),
        fetch("/api/maintenance").then(r => r.json()),
        fetch("/api/tickets").then(r => r.json()),
      ]);
      setStats(s);
      setYachts(Array.isArray(y) ? y : []);
      setAlerts(Array.isArray(a) ? a : []);
      setMaintenance(Array.isArray(m) ? m : []);
      setTickets(Array.isArray(t) ? t : []);
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const timer = setInterval(fetchAll, 30000);
    return () => clearInterval(timer);
  }, [fetchAll]);

  const navigate = (view: string) => setActiveView(view as ActiveView);
  const criticalCount = alerts.filter(a => a.type === "critical").length;

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <FleetOverview
            stats={stats}
            yachts={yachts}
            alerts={alerts}
            records={maintenance}
            onRefresh={fetchAll}
            onNavigate={navigate}
          />
        );
      case "alerts":
        return <AlertsPanel alerts={alerts} onRefresh={fetchAll} />;
      case "maintenance":
        return <MaintenancePanel records={maintenance} />;
      case "twin":
        return <DigitalTwinPanel yachts={yachts} />;
      case "analytics":
        return <AnalyticsPanel yachts={yachts} maintenance={maintenance} alerts={alerts} />;
      case "smartworker":
        return <TicketsPanel tickets={tickets} yachts={yachts} onRefresh={fetchAll} />;
      case "compliance":
        return <CompliancePanel yachts={yachts} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 12,
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: "50%",
          border: "2px solid var(--border-strong)",
          borderTopColor: "var(--accent)",
          animation: "spin 0.7s linear infinite",
        }} />
        <div style={{ fontSize: 13, color: "var(--text-2)" }}>Loading…</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        active={activeView}
        onNavigate={navigate}
        alertCount={criticalCount}
      />
      <div className="app-main">
        <div className="app-content">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
