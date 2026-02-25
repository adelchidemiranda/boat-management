"use client";

import Link from "next/link";
import {
  Anchor,
  Brain,
  Cpu,
  FileCheck,
  BarChart2,
  Wrench,
  Shield,
  ArrowRight,
  CheckCircle,
  Users,
  Zap,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
        borderBottom: "1px solid var(--border)",
        background: "rgba(244,247,251,0.90)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: "var(--accent)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Anchor size={14} color="white" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 600 }}>YachtSense</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Features", "Platform", "Pricing", "Company"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontSize: 13, color: "var(--text-2)", textDecoration: "none",
              transition: "color 150ms",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}
            >{item}</a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/dashboard" style={{
            fontSize: 13, color: "var(--text-2)", textDecoration: "none", padding: "7px 14px",
          }}>
            Sign in
          </Link>
          <Link href="/dashboard" style={{
            fontSize: 13, fontWeight: 500, color: "white", textDecoration: "none",
            background: "var(--accent)", padding: "7px 16px", borderRadius: 8,
            transition: "opacity 150ms",
          }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Nautical radial glow — azzurro on white */}
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
          width: 900, height: 500,
          background: "radial-gradient(ellipse, rgba(0,119,182,0.10) 0%, rgba(0,180,216,0.04) 45%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Teak accent line */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "60%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.35), transparent)",
        }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 14px", borderRadius: 99,
          background: "var(--bg-1)", border: "1px solid var(--border)",
          fontSize: 12, color: "var(--text-2)", marginBottom: 32,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
          AI-powered · Trusted by 40+ manufacturers globally
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          maxWidth: 820,
          marginBottom: 24,
          color: "var(--text-1)",
        }}>
          The Virtual Yacht Manager<br />
          <span style={{ color: "var(--accent)" }}>your fleet deserves</span>
        </h1>

        <p style={{
          fontSize: "clamp(15px, 2vw, 18px)",
          color: "var(--text-2)",
          maxWidth: 560,
          lineHeight: 1.7,
          marginBottom: 40,
        }}>
          YachtSense automates the entire post-sale lifecycle of your fleet — from AI predictive maintenance to compliance, insurance and technician dispatch. Built for yacht manufacturers.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/dashboard" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", background: "var(--accent)", color: "white",
            borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 600,
            transition: "opacity 150ms",
          }}>
            Open Dashboard <ArrowRight size={15} />
          </Link>
          <a href="#features" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px",
            background: "var(--bg-1)", color: "var(--text-1)",
            border: "1px solid var(--border)", borderRadius: 10,
            textDecoration: "none", fontSize: 14, fontWeight: 500,
          }}>
            Explore features
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 48, marginTop: 72, flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            { val: "€2.4M", label: "saved per client / year" },
            { val: "68%", label: "reduction in warranty claims" },
            { val: "3.2×", label: "ROI in first year" },
            { val: "40+", label: "manufacturers onboarded" },
          ].map(s => (
            <div key={s.val} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-1)" }}>
                {s.val}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section style={{ padding: "0 48px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          background: "var(--bg-1)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,60,130,0.12)",
        }}>
          {/* Fake browser chrome */}
          <div style={{
            height: 40, background: "var(--bg-2)",
            borderBottom: "1px solid var(--border)",
            display: "flex", alignItems: "center", padding: "0 16px", gap: 8,
          }}>
            {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.6 }} />
            ))}
            <div style={{
              marginLeft: 16, flex: 1, maxWidth: 280,
              background: "var(--bg-3)", borderRadius: 6, height: 22,
              display: "flex", alignItems: "center", padding: "0 10px",
              fontSize: 11, color: "var(--text-3)",
            }}>
              app.yachtsense.io/dashboard
            </div>
          </div>
          {/* Fake dashboard screenshot */}
          <div style={{ display: "flex", height: 420 }}>
            {/* Sidebar — navy like real dashboard */}
            <div style={{
              width: 180, flexShrink: 0,
              background: "#0B1A2E",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              padding: "16px 10px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 16 }}>
                <div style={{ width: 22, height: 22, background: "var(--accent)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Anchor size={10} color="white" />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>YachtSense</span>
              </div>
              {[
                { label: "Fleet Overview", active: true },
                { label: "AI Alerts", badge: "2" },
                { label: "Digital Twin", active: false },
                { label: "Maintenance", active: false },
                { label: "Compliance", active: false },
                { label: "Analytics", active: false },
              ].map(n => (
                <div key={n.label} style={{
                  padding: "7px 8px", borderRadius: 7, marginBottom: 1,
                  background: n.active ? "rgba(30,144,255,0.18)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: 11, color: n.active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)" }}>
                    {n.label}
                  </span>
                  {n.badge && (
                    <span style={{ fontSize: 9, background: "var(--red)", color: "white", borderRadius: 99, padding: "1px 5px", fontWeight: 700 }}>
                      {n.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Content */}
            <div style={{ flex: 1, padding: "20px 24px", overflow: "hidden" }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Fleet Overview</div>
              <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 18 }}>Wednesday 25 February</div>
              {/* KPIs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
                {[
                  { label: "Fleet Health", val: "80%", color: "#eab308" },
                  { label: "Active Alerts", val: "7", color: "#ef4444" },
                  { label: "Open Jobs", val: "3", color: "var(--text-1)" },
                  { label: "Vessels", val: "5", color: "var(--text-1)" },
                ].map(k => (
                  <div key={k.label} style={{
                    background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px",
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: k.color }}>{k.val}</div>
                    <div style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 3 }}>{k.label}</div>
                  </div>
                ))}
              </div>
              {/* Table */}
              <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", fontSize: 12, fontWeight: 600 }}>Vessels</div>
                {[
                  { name: "Predator 74", health: 58, color: "#ef4444", status: "Maintenance" },
                  { name: "La Dolce Vita", health: 74, color: "#eab308", status: "Maintenance" },
                  { name: "Azzurra I", health: 92, color: "#22c55e", status: "Active" },
                  { name: "Ferretti 780", health: 97, color: "#22c55e", status: "Active" },
                ].map(y => (
                  <div key={y.name} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "9px 14px",
                    borderBottom: "1px solid var(--border)", fontSize: 12,
                  }}>
                    <span style={{ fontWeight: 500, width: 110 }}>{y.name}</span>
                    <div style={{ flex: 1, height: 3, background: "var(--bg-3)", borderRadius: 99 }}>
                      <div style={{ width: `${y.health}%`, height: "100%", background: y.color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontWeight: 600, color: y.color, width: 32, textAlign: "right" }}>{y.health}%</span>
                    <span style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 500,
                      background: y.status === "Active" ? "rgba(34,197,94,0.1)" : "rgba(234,179,8,0.1)",
                      color: y.status === "Active" ? "#22c55e" : "#eab308",
                    }}>{y.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 99,
            background: "var(--bg-1)", border: "1px solid var(--border)",
            fontSize: 11, fontWeight: 600, color: "var(--accent)", marginBottom: 20,
            textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            Platform
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Everything in one platform
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-2)", maxWidth: 500, margin: "0 auto" }}>
            From sensor to invoice — automated, auditable, and always on.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            {
              icon: Brain,
              title: "AI Predictive Maintenance",
              desc: "Machine learning models trained on 1M+ engine hours detect failures before they happen. 94% accuracy on critical component predictions.",
              tag: "Core",
            },
            {
              icon: Cpu,
              title: "Digital Twin",
              desc: "Real-time 3D model of each vessel. Live telemetry from 40+ IoT sensors: engine temp, hull vibration, fuel, bilge, wind — updated every 5 seconds.",
              tag: "IoT",
            },
            {
              icon: Wrench,
              title: "Smart Worker Automation",
              desc: "AI automatically routes and assigns tickets to the nearest certified technician with the right skills and parts. Cuts dispatch time by 78%.",
              tag: "Operations",
            },
            {
              icon: FileCheck,
              title: "Compliance & Documents",
              desc: "Never miss a certificate renewal. Automated tracking of safety certificates, licenses, surveys, and crew certifications with 90-day advance alerts.",
              tag: "Compliance",
            },
            {
              icon: Shield,
              title: "Insurance Automation",
              desc: "Automatic incident reports, sensor-verified claims, and usage-based insurance integration. Reduce false claims by 62%.",
              tag: "Insurance",
            },
            {
              icon: BarChart2,
              title: "Fleet Analytics",
              desc: "Executive dashboards showing cost-per-vessel, failure heatmaps, warranty ROI, and technician performance. Built for the C-suite.",
              tag: "Insights",
            },
          ].map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} style={{
                background: "var(--bg-1)",
                border: "1px solid var(--border)",
                borderRadius: 14, padding: "24px",
                transition: "border-color 150ms",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: "var(--accent-dim)", border: "1px solid var(--accent-ring)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
                }}>
                  <Icon size={17} color="var(--accent)" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</div>
                  <span style={{
                    fontSize: 10, padding: "2px 7px", borderRadius: 4,
                    background: "var(--bg-2)", color: "var(--text-3)",
                    fontWeight: 500, letterSpacing: "0.03em",
                  }}>{f.tag}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding: "80px 48px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-1)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>
              How it works
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-2)" }}>Up and running in 48 hours.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            {[
              { n: "01", title: "Connect sensors", desc: "Install our IoT gateway on each vessel. Plug-and-play with NMEA 2000, CAN bus, and any 4G/satellite modem." },
              { n: "02", title: "Onboard your fleet", desc: "Upload vessel specs, maintenance history, and crew certifications. AI builds the baseline health model automatically." },
              { n: "03", title: "AI starts learning", desc: "Within 7 days, YachtSense predicts its first component failure with 90%+ confidence. Zero configuration needed." },
              { n: "04", title: "Automate operations", desc: "Set your rules once. The platform dispatches technicians, renews documents, and notifies owners — autonomously." },
            ].map(s => (
              <div key={s.n} style={{ padding: "4px 0" }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: "var(--accent)",
                  letterSpacing: "0.06em", marginBottom: 12,
                }}>{s.n}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Trusted by leading manufacturers
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-2)" }}>
            Used by 40+ OEMs across Europe, USA and Asia-Pacific.
          </p>
        </div>

        {/* Manufacturer logos (text-based) */}
        <div style={{
          display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center",
          borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)",
          marginBottom: 56,
        }}>
          {["Azimut · Benetti", "Ferretti Group", "Sunseeker", "Princess Yachts", "Sanlorenzo", "Riva"].map(m => (
            <div key={m} style={{
              padding: "20px 36px",
              borderRight: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              fontSize: 14, fontWeight: 600, color: "var(--text-3)",
              letterSpacing: "0.02em",
            }}>{m}</div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            {
              quote: "YachtSense reduced our warranty cost by €1.8M in the first year. The AI caught a failing heat exchanger 3 weeks before it would have destroyed the engine.",
              author: "Head of After-Sales",
              company: "Major European Shipyard",
              metric: "€1.8M saved",
            },
            {
              quote: "Our technicians used to spend 30% of their time on paperwork. Now the platform handles dispatch, parts ordering, and compliance reports automatically.",
              author: "Fleet Operations Director",
              company: "Mediterranean Charter Group",
              metric: "78% less admin",
            },
            {
              quote: "The digital twin feature alone is worth the subscription. Our owners can see their yacht's health in real time from their phone. It's a premium differentiator.",
              author: "CEO",
              company: "Luxury Brokerage House",
              metric: "4.9★ owner NPS",
            },
          ].map(t => (
            <div key={t.author} style={{
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              borderRadius: 14, padding: "24px",
            }}>
              <p style={{ fontSize: 14, color: "var(--text-1)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{t.author}</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>{t.company}</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: "var(--green)",
                  background: "var(--green-dim)", padding: "4px 10px", borderRadius: 6,
                }}>{t.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{
        padding: "80px 48px",
        borderTop: "1px solid var(--border)",
        background: "var(--bg-1)",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px", borderRadius: 99,
              background: "var(--bg-2)", border: "1px solid var(--border)",
              fontSize: 11, fontWeight: 600, color: "var(--accent)", marginBottom: 20,
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}>
              Pricing
            </div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 14 }}>
              Enterprise pricing, tailored to you
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-2)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              We work directly with yacht manufacturers and shipyards. Every contract is scoped to your fleet size, modules, and integration needs.
            </p>
          </div>

          {/* Single enterprise card — teak + azzurro accent */}
          <div style={{
            background: "var(--bg-1)",
            border: "1px solid var(--border-strong)",
            borderTop: "2px solid var(--teak)",
            borderRadius: 20,
            padding: "40px 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
            boxShadow: "var(--shadow-md)",
          }}>
            {/* Left */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                Enterprise · Custom
              </div>
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em", marginBottom: 8 }}>
                Let's talk
              </div>
              <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 28 }}>
                Pricing is based on fleet size, modules activated, and integration scope. Most clients see ROI within the first 6 months.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <a href="mailto:hello@yachtsense.io" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 22px", background: "var(--accent)", color: "white",
                  borderRadius: 9, textDecoration: "none", fontSize: 13, fontWeight: 600,
                }}>
                  Book a demo
                </a>
                <Link href="/dashboard" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 20px",
                  background: "transparent", color: "var(--text-1)",
                  border: "1px solid var(--border-strong)", borderRadius: 9,
                  textDecoration: "none", fontSize: 13, fontWeight: 500,
                }}>
                  Try the platform
                </Link>
              </div>
            </div>

            {/* Right — inclusions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { title: "Full platform access", desc: "All modules — fleet, alerts, digital twin, maintenance, compliance, analytics" },
                { title: "White-label & OEM branding", desc: "Deploy under your own brand to your customers" },
                { title: "Custom AI model training", desc: "Trained on your vessel data for highest accuracy" },
                { title: "Dedicated success manager", desc: "A YachtSense expert embedded in your after-sales team" },
                { title: "SLA & uptime guarantees", desc: "99.9% uptime with contractual SLAs and priority support" },
                { title: "API & ERP integrations", desc: "Connect to your existing warranty, CRM or DMS systems" },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}>
                    <CheckCircle size={14} color="var(--green)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust line */}
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-3)", marginTop: 24 }}>
            No long-term lock-in · GDPR compliant · EU-hosted infrastructure · NDA available on request
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "80px 48px",
        textAlign: "center",
        borderTop: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            Ready to protect your fleet?
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-2)", marginBottom: 36, lineHeight: 1.6 }}>
            Join 40+ manufacturers who reduced warranty costs and unlocked new recurring revenue with YachtSense.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", background: "var(--accent)", color: "white",
              borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 600,
            }}>
              Open the dashboard <ArrowRight size={15} />
            </Link>
            <a href="mailto:hello@yachtsense.io" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 24px",
              background: "transparent", color: "var(--text-1)",
              border: "1px solid var(--border-strong)", borderRadius: 10,
              textDecoration: "none", fontSize: 15, fontWeight: 500,
            }}>
              Book a demo
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "40px 48px",
        background: "var(--bg-1)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 24, height: 24, background: "var(--accent)",
                  borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Anchor size={11} color="white" />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600 }}>YachtSense</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-3)", maxWidth: 240, lineHeight: 1.6 }}>
                The AI platform for yacht manufacturers. Reduce costs, automate compliance, and delight owners.
              </p>
            </div>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {[
                { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
                { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
                { heading: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
              ].map(col => (
                <div key={col.heading}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                    {col.heading}
                  </div>
                  {col.links.map(l => (
                    <div key={l} style={{ marginBottom: 8 }}>
                      <a href="#" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>{l}</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{
            marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <span style={{ fontSize: 12, color: "var(--text-3)" }}>
              © 2026 YachtSense. All rights reserved.
            </span>
            <span style={{ fontSize: 12, color: "var(--text-3)" }}>
              Engineered by H-FARM Ventures
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
