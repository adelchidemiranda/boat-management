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
} from "lucide-react";
import AICallButton from "@/components/AICallButton";

export default function LandingPage() {
  return (
    <div style={{ background: "#FAFAFA", color: "#0C1C30", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px",
        background: "rgba(250,250,250,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, background: "#0077B6",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Anchor size={14} color="white" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", color: "#0C1C30" }}>YachtSense</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {["Features", "Platform", "Pricing", "Company"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontSize: 13, color: "#5A7A9A", textDecoration: "none",
              transition: "color 150ms",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0C1C30")}
              onMouseLeave={e => (e.currentTarget.style.color = "#5A7A9A")}
            >{item}</a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/dashboard" style={{
            fontSize: 13, color: "#5A7A9A", textDecoration: "none", padding: "7px 14px",
          }}>
            Sign in
          </Link>
          <Link href="/dashboard" style={{
            fontSize: 13, fontWeight: 500, color: "white", textDecoration: "none",
            background: "#0077B6", padding: "8px 18px", borderRadius: 8,
            transition: "background 150ms",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#005E94")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0077B6")}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "140px 24px 100px",
        maxWidth: 860,
        margin: "0 auto",
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "5px 14px", borderRadius: 99,
          background: "white", border: "1px solid rgba(0,0,0,0.08)",
          fontSize: 12, color: "#5A7A9A", marginBottom: 40,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0A7C4E" }} />
          AI-powered · Trusted by 40+ manufacturers globally
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(44px, 6.5vw, 80px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          marginBottom: 28,
          color: "#0C1C30",
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
        }}>
          The Virtual Yacht Manager<br />
          <span style={{ color: "#0077B6", fontStyle: "italic" }}>your fleet deserves</span>
        </h1>

        <p style={{
          fontSize: "clamp(15px, 2vw, 18px)",
          color: "#5A7A9A",
          maxWidth: 520,
          lineHeight: 1.75,
          marginBottom: 44,
        }}>
          YachtSense automates the entire post-sale lifecycle — from AI predictive maintenance to compliance, insurance and technician dispatch.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/dashboard" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", background: "#0077B6", color: "white",
            borderRadius: 9, textDecoration: "none", fontSize: 14, fontWeight: 500,
          }}>
            Open Dashboard <ArrowRight size={14} />
          </Link>
          <AICallButton variant="hero" />
          <a href="#features" style={{
            display: "inline-flex", alignItems: "center",
            padding: "12px 22px",
            background: "white", color: "#0C1C30",
            border: "1px solid rgba(0,0,0,0.09)", borderRadius: 9,
            textDecoration: "none", fontSize: 14, fontWeight: 400,
          }}>
            Explore features
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 56, marginTop: 80, flexWrap: "wrap", justifyContent: "center",
          paddingTop: 48, borderTop: "1px solid rgba(0,0,0,0.07)",
          width: "100%",
        }}>
          {[
            { val: "€2.4M", label: "saved per client / year" },
            { val: "68%", label: "reduction in warranty claims" },
            { val: "3.2×", label: "ROI in first year" },
            { val: "40+", label: "manufacturers onboarded" },
          ].map(s => (
            <div key={s.val} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", color: "#0C1C30",
                fontFamily: "var(--font-cormorant), serif",
              }}>
                {s.val}
              </div>
              <div style={{ fontSize: 12, color: "#8AAAC0", marginTop: 5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section style={{ padding: "0 48px 96px", maxWidth: 1160, margin: "0 auto" }}>
        <div style={{
          background: "white",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,60,130,0.09)",
        }}>
          {/* Browser chrome */}
          <div style={{
            height: 38, background: "#F2F2F2",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            display: "flex", alignItems: "center", padding: "0 14px", gap: 7,
          }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
            <div style={{
              marginLeft: 14, flex: 1, maxWidth: 260,
              background: "#E5E5E5", borderRadius: 5, height: 20,
              display: "flex", alignItems: "center", padding: "0 10px",
              fontSize: 11, color: "#999",
            }}>
              app.yachtsense.io/dashboard
            </div>
          </div>

          {/* Fake dashboard */}
          <div style={{ display: "flex", height: 400 }}>
            {/* Sidebar */}
            <div style={{
              width: 176, flexShrink: 0,
              background: "#0B1A2E",
              padding: "16px 10px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 8px", marginBottom: 20 }}>
                <div style={{ width: 20, height: 20, background: "#0077B6", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Anchor size={9} color="white" />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "white" }}>YachtSense</span>
              </div>
              {[
                { label: "Fleet Overview", active: true },
                { label: "AI Alerts", badge: "2" },
                { label: "Digital Twin" },
                { label: "Maintenance" },
                { label: "Compliance" },
                { label: "Analytics" },
              ].map(n => (
                <div key={n.label} style={{
                  padding: "7px 8px", borderRadius: 6, marginBottom: 1,
                  background: n.active ? "rgba(0,119,182,0.22)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: 11, color: n.active ? "white" : "rgba(255,255,255,0.45)" }}>
                    {n.label}
                  </span>
                  {n.badge && (
                    <span style={{ fontSize: 9, background: "#C0392B", color: "white", borderRadius: 99, padding: "1px 5px", fontWeight: 700 }}>
                      {n.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: "20px 24px", background: "#FAFAFA" }}>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 3 }}>Fleet Overview</div>
              <div style={{ fontSize: 11, color: "#8AAAC0", marginBottom: 18 }}>Thursday 26 February</div>
              {/* KPIs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
                {[
                  { label: "Fleet Health", val: "80%", color: "#B45309" },
                  { label: "Active Alerts", val: "7", color: "#C0392B" },
                  { label: "Open Jobs", val: "3", color: "#0C1C30" },
                  { label: "Vessels", val: "5", color: "#0C1C30" },
                ].map(k => (
                  <div key={k.label} style={{
                    background: "white", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 9, padding: "12px 13px",
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: k.color }}>{k.val}</div>
                    <div style={{ fontSize: 9, color: "#8AAAC0", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>{k.label}</div>
                  </div>
                ))}
              </div>
              {/* Table */}
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 9, overflow: "hidden" }}>
                <div style={{ padding: "9px 13px", borderBottom: "1px solid rgba(0,0,0,0.07)", fontSize: 11, fontWeight: 600, color: "#0C1C30" }}>Vessels</div>
                {[
                  { name: "Predator 74", health: 58, color: "#C0392B", status: "Maintenance" },
                  { name: "La Dolce Vita", health: 74, color: "#B45309", status: "Maintenance" },
                  { name: "Azzurra I", health: 92, color: "#0A7C4E", status: "Active" },
                  { name: "Ferretti 780", health: 97, color: "#0A7C4E", status: "Active" },
                ].map(y => (
                  <div key={y.name} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "9px 13px",
                    borderBottom: "1px solid rgba(0,0,0,0.05)", fontSize: 11,
                  }}>
                    <span style={{ fontWeight: 500, width: 100, color: "#0C1C30" }}>{y.name}</span>
                    <div style={{ flex: 1, height: 3, background: "#EEE", borderRadius: 99 }}>
                      <div style={{ width: `${y.health}%`, height: "100%", background: y.color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontWeight: 600, color: y.color, width: 30, textAlign: "right" }}>{y.health}%</span>
                    <span style={{
                      fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 500,
                      background: y.status === "Active" ? "rgba(10,124,78,0.08)" : "rgba(180,83,9,0.08)",
                      color: y.status === "Active" ? "#0A7C4E" : "#B45309",
                    }}>{y.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "96px 56px", maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: "#0077B6",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Platform
          </div>
          <h2 style={{
            fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, letterSpacing: "-0.03em",
            marginBottom: 14, maxWidth: 520,
            fontFamily: "var(--font-cormorant), serif",
          }}>
            Everything in one platform
          </h2>
          <p style={{ fontSize: 15, color: "#5A7A9A", maxWidth: 460, lineHeight: 1.7 }}>
            From sensor to invoice — automated, auditable, and always on.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, overflow: "hidden" }}>
          {[
            { icon: Brain, title: "AI Predictive Maintenance", desc: "ML models trained on 1M+ engine hours detect failures before they happen. 94% accuracy on critical component predictions.", tag: "Core" },
            { icon: Cpu, title: "Digital Twin", desc: "Real-time 3D model of each vessel. Live telemetry from 40+ IoT sensors: engine temp, hull vibration, fuel, bilge — updated every 5s.", tag: "IoT" },
            { icon: Wrench, title: "Smart Worker Automation", desc: "AI routes and assigns tickets to the nearest certified technician. Cuts dispatch time by 78%.", tag: "Operations" },
            { icon: FileCheck, title: "Compliance & Documents", desc: "Automated tracking of safety certificates, licenses, surveys, and crew certifications with 90-day advance alerts.", tag: "Compliance" },
            { icon: Shield, title: "Insurance Automation", desc: "Automatic incident reports, sensor-verified claims, and usage-based insurance integration. Reduce false claims by 62%.", tag: "Insurance" },
            { icon: BarChart2, title: "Fleet Analytics", desc: "Executive dashboards showing cost-per-vessel, failure heatmaps, warranty ROI, and technician performance.", tag: "Insights" },
          ].map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} style={{
                background: "white",
                padding: "28px 28px",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: "rgba(0,119,182,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
                }}>
                  <Icon size={16} color="#0077B6" />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#0C1C30" }}>{f.title}</div>
                <p style={{ fontSize: 13, color: "#5A7A9A", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding: "96px 56px",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        background: "white",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#0077B6", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Process</div>
            <h2 style={{
              fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 600, letterSpacing: "-0.03em",
              fontFamily: "var(--font-cormorant), serif",
            }}>
              Up and running in 48 hours
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
            {[
              { n: "01", title: "Connect sensors", desc: "Install our IoT gateway on each vessel. Plug-and-play with NMEA 2000, CAN bus, and any 4G/satellite modem." },
              { n: "02", title: "Onboard your fleet", desc: "Upload vessel specs, maintenance history, and crew certifications. AI builds the baseline health model automatically." },
              { n: "03", title: "AI starts learning", desc: "Within 7 days, YachtSense predicts its first component failure with 90%+ confidence. Zero configuration." },
              { n: "04", title: "Automate operations", desc: "Set your rules once. The platform dispatches technicians, renews documents, and notifies owners — autonomously." },
            ].map(s => (
              <div key={s.n}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#0077B6", letterSpacing: "0.06em", marginBottom: 14 }}>{s.n}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10, color: "#0C1C30" }}>{s.title}</div>
                <p style={{ fontSize: 13, color: "#5A7A9A", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section style={{ padding: "96px 56px", maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#0077B6", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Clients</div>
          <h2 style={{
            fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 600, letterSpacing: "-0.03em",
            fontFamily: "var(--font-cormorant), serif",
          }}>
            Trusted by leading manufacturers
          </h2>
        </div>

        {/* Logo strip */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          borderTop: "1px solid rgba(0,0,0,0.07)", borderLeft: "1px solid rgba(0,0,0,0.07)",
          marginBottom: 56, borderRadius: 2,
        }}>
          {["Azimut · Benetti", "Ferretti Group", "Sunseeker", "Princess Yachts", "Sanlorenzo", "Riva"].map(m => (
            <div key={m} style={{
              padding: "20px 36px",
              borderRight: "1px solid rgba(0,0,0,0.07)",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              fontSize: 13, fontWeight: 600, color: "#C0C8D4",
              letterSpacing: "0.02em",
            }}>{m}</div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {[
            { quote: "YachtSense reduced our warranty cost by €1.8M in the first year. The AI caught a failing heat exchanger 3 weeks before it would have destroyed the engine.", author: "Head of After-Sales", company: "Major European Shipyard", metric: "€1.8M saved" },
            { quote: "Our technicians used to spend 30% of their time on paperwork. Now the platform handles dispatch, parts ordering, and compliance reports automatically.", author: "Fleet Operations Director", company: "Mediterranean Charter Group", metric: "78% less admin" },
            { quote: "The digital twin feature alone is worth the subscription. Our owners can see their yacht's health in real time. It's a premium differentiator.", author: "CEO", company: "Luxury Brokerage House", metric: "4.9★ owner NPS" },
          ].map(t => (
            <div key={t.author} style={{
              background: "white", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "28px",
            }}>
              <p style={{ fontSize: 14, color: "#0C1C30", lineHeight: 1.75, marginBottom: 24, fontStyle: "italic", fontFamily: "var(--font-cormorant), serif", fontSize: 16 }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0C1C30" }}>{t.author}</div>
                  <div style={{ fontSize: 11, color: "#8AAAC0", marginTop: 2 }}>{t.company}</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: "#0A7C4E",
                  background: "rgba(10,124,78,0.07)", padding: "4px 10px", borderRadius: 6,
                }}>{t.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{
        padding: "96px 56px",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        background: "white",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#0077B6", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Pricing</div>
            <h2 style={{
              fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 600, letterSpacing: "-0.03em", marginBottom: 14,
              fontFamily: "var(--font-cormorant), serif",
            }}>
              Enterprise pricing, tailored to you
            </h2>
            <p style={{ fontSize: 15, color: "#5A7A9A", maxWidth: 440, lineHeight: 1.7 }}>
              Every contract is scoped to your fleet size, modules, and integration needs.
            </p>
          </div>

          <div style={{
            background: "#FAFAFA",
            border: "1px solid rgba(0,0,0,0.08)",
            borderLeft: "3px solid #0077B6",
            borderRadius: 12,
            padding: "44px 48px",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#0077B6", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                Enterprise · Custom
              </div>
              <div style={{
                fontSize: 42, fontWeight: 600, letterSpacing: "-0.04em", marginBottom: 12,
                fontFamily: "var(--font-cormorant), serif",
              }}>
                Let's talk
              </div>
              <p style={{ fontSize: 14, color: "#5A7A9A", lineHeight: 1.7, marginBottom: 28 }}>
                Most clients see ROI within the first 6 months.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <a href="mailto:hello@yachtsense.io" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 22px", background: "#0077B6", color: "white",
                  borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 500,
                }}>
                  Book a demo
                </a>
                <Link href="/dashboard" style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "10px 20px", background: "transparent", color: "#0C1C30",
                  border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8,
                  textDecoration: "none", fontSize: 13,
                }}>
                  Try the platform
                </Link>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "Full platform access", desc: "All modules — fleet, alerts, digital twin, maintenance, compliance, analytics" },
                { title: "White-label & OEM branding", desc: "Deploy under your own brand to your customers" },
                { title: "Custom AI model training", desc: "Trained on your vessel data for highest accuracy" },
                { title: "Dedicated success manager", desc: "A YachtSense expert embedded in your after-sales team" },
                { title: "SLA & uptime guarantees", desc: "99.9% uptime with contractual SLAs" },
                { title: "API & ERP integrations", desc: "Connect to your existing warranty, CRM or DMS systems" },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ marginTop: 3, flexShrink: 0 }}>
                    <CheckCircle size={13} color="#0A7C4E" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, color: "#0C1C30" }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#8AAAC0", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: "#8AAAC0", marginTop: 20 }}>
            No long-term lock-in · GDPR compliant · EU-hosted · NDA available on request
          </p>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{
        padding: "96px 56px",
        textAlign: "center",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        background: "#FAFAFA",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(28px,4vw,52px)", fontWeight: 600, letterSpacing: "-0.03em",
            lineHeight: 1.1, marginBottom: 18,
            fontFamily: "var(--font-cormorant), serif",
          }}>
            Ready to protect your fleet?
          </h2>
          <p style={{ fontSize: 16, color: "#5A7A9A", marginBottom: 36, lineHeight: 1.7 }}>
            Join 40+ manufacturers who reduced warranty costs and unlocked new recurring revenue.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 26px", background: "#0077B6", color: "white",
              borderRadius: 9, textDecoration: "none", fontSize: 14, fontWeight: 500,
            }}>
              Open the dashboard <ArrowRight size={14} />
            </Link>
            <a href="mailto:hello@yachtsense.io" style={{
              display: "inline-flex", alignItems: "center",
              padding: "13px 24px", background: "white", color: "#0C1C30",
              border: "1px solid rgba(0,0,0,0.09)", borderRadius: 9,
              textDecoration: "none", fontSize: 14,
            }}>
              Book a demo
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(0,0,0,0.07)",
        padding: "44px 56px",
        background: "white",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{
                  width: 26, height: 26, background: "#0077B6",
                  borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Anchor size={11} color="white" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0C1C30" }}>YachtSense</span>
              </div>
              <p style={{ fontSize: 12, color: "#8AAAC0", maxWidth: 220, lineHeight: 1.7 }}>
                The AI platform for yacht manufacturers. Reduce costs, automate compliance, and delight owners.
              </p>
            </div>
            <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
              {[
                { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
                { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
                { heading: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
              ].map(col => (
                <div key={col.heading}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#8AAAC0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
                    {col.heading}
                  </div>
                  {col.links.map(l => (
                    <div key={l} style={{ marginBottom: 9 }}>
                      <a href="#" style={{ fontSize: 13, color: "#5A7A9A", textDecoration: "none" }}>{l}</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{
            marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <span style={{ fontSize: 12, color: "#8AAAC0" }}>© 2026 YachtSense. All rights reserved.</span>
            <span style={{ fontSize: 12, color: "#8AAAC0" }}>Engineered by H-FARM Ventures</span>
          </div>
        </div>
      </footer>

      {/* Floating AI Call Button */}
      <AICallButton variant="floating" />
    </div>
  );
}
