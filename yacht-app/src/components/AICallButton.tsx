"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, PhoneOff, X, Mic, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type CallState = "idle" | "entering" | "calling" | "active" | "ended" | "error";

interface AICallButtonProps {
    variant?: "sidebar" | "hero" | "floating";
    collapsed?: boolean;
}

export default function AICallButton({
    variant = "floating",
    collapsed = false,
}: AICallButtonProps) {
    const [open, setOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [callState, setCallState] = useState<CallState>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [callSeconds, setCallSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when modal opens
    useEffect(() => {
        if (open && callState === "idle") {
            setTimeout(() => inputRef.current?.focus(), 120);
        }
    }, [open, callState]);

    // Timer for active call
    useEffect(() => {
        if (callState === "active") {
            timerRef.current = setInterval(() => setCallSeconds((s) => s + 1), 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
            setCallSeconds(0);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [callState]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };

    const handleOpenModal = () => {
        setCallState("idle");
        setPhoneNumber("");
        setErrorMsg("");
        setOpen(true);
    };

    const handleClose = () => {
        if (callState === "calling" || callState === "active") return; // prevent accidental close
        setOpen(false);
        setCallState("idle");
        setPhoneNumber("");
        setErrorMsg("");
    };

    const handleCall = async () => {
        const cleaned = phoneNumber.replace(/\s/g, "");
        if (!cleaned || cleaned.length < 6) {
            setErrorMsg("Inserisci un numero di telefono valido (es. +39331...)");
            return;
        }

        setErrorMsg("");
        setCallState("calling");

        try {
            const res = await fetch("/api/elevenlabs-call", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ to_number: cleaned }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(
                    data.detail?.detail ?? data.detail?.message ?? data.error ?? "Errore sconosciuto"
                );
            }

            setCallState("active");
        } catch (err: any) {
            setErrorMsg(err.message ?? "Impossibile avviare la chiamata.");
            setCallState("error");
        }
    };

    const handleEndCall = () => {
        setCallState("ended");
        setTimeout(() => {
            setOpen(false);
            setCallState("idle");
            setPhoneNumber("");
        }, 2000);
    };

    // ── Trigger button styles based on variant ──
    const renderTrigger = () => {
        if (variant === "sidebar") {
            if (collapsed) {
                return (
                    <button
                        id="ai-call-btn-sidebar-collapsed"
                        onClick={handleOpenModal}
                        title="Talk to AI Agent"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(0,119,182,0.45)",
                            transition: "all 200ms ease",
                            margin: "0 auto",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.08)";
                            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,119,182,0.55)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,119,182,0.45)";
                        }}
                    >
                        <Phone size={15} color="white" />
                    </button>
                );
            }

            return (
                <button
                    id="ai-call-btn-sidebar"
                    onClick={handleOpenModal}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        width: "100%",
                        padding: "9px 10px",
                        borderRadius: 9,
                        background: "linear-gradient(135deg, rgba(0,119,182,0.22) 0%, rgba(0,180,216,0.12) 100%)",
                        border: "1px solid rgba(0,180,216,0.30)",
                        cursor: "pointer",
                        transition: "all 200ms ease",
                        color: "#00B4D8",
                        fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                            "linear-gradient(135deg, rgba(0,119,182,0.32) 0%, rgba(0,180,216,0.20) 100%)";
                        e.currentTarget.style.borderColor = "rgba(0,180,216,0.50)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                            "linear-gradient(135deg, rgba(0,119,182,0.22) 0%, rgba(0,180,216,0.12) 100%)";
                        e.currentTarget.style.borderColor = "rgba(0,180,216,0.30)";
                    }}
                >
                    {/* Animated pulse dot */}
                    <span style={{ position: "relative", flexShrink: 0 }}>
                        <span
                            style={{
                                display: "block",
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "#00B4D8",
                            }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                inset: -3,
                                borderRadius: "50%",
                                border: "2px solid rgba(0,180,216,0.40)",
                                animation: "aiCallPulse 1.8s ease-in-out infinite",
                            }}
                        />
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
                        Talk to AI Agent
                    </span>
                    <Phone size={12} style={{ marginLeft: "auto", opacity: 0.7 }} />
                </button>
            );
        }

        if (variant === "hero") {
            return (
                <button
                    id="ai-call-btn-hero"
                    onClick={handleOpenModal}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "13px 26px",
                        background: "linear-gradient(135deg, #0077B6, #00B4D8)",
                        color: "white",
                        border: "none",
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 4px 24px rgba(0,119,182,0.40)",
                        transition: "all 200ms ease",
                        fontFamily: "inherit",
                        position: "relative",
                        overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,119,182,0.50)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,119,182,0.40)";
                    }}
                >
                    <Phone size={16} />
                    Parla con l&apos;AI Agent
                </button>
            );
        }

        // floating
        return (
            <button
                id="ai-call-btn-floating"
                onClick={handleOpenModal}
                title="Talk to AI Agent"
                style={{
                    position: "fixed",
                    bottom: 28,
                    right: 28,
                    zIndex: 200,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "13px 20px",
                    background: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 4px 24px rgba(0,119,182,0.50), 0 0 0 0 rgba(0,180,216,0.3)",
                    animation: "floatPulse 2.5s ease-in-out infinite",
                    transition: "transform 200ms ease, box-shadow 200ms ease",
                    fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                }}
            >
                <Phone size={16} />
                Talk to AI
            </button>
        );
    };

    return (
        <>
            <style>{`
        @keyframes aiCallPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.6); opacity: 0; }
        }

        @keyframes floatPulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(0,119,182,0.50), 0 0 0 0 rgba(0,180,216,0.4); }
          50% { box-shadow: 0 4px 24px rgba(0,119,182,0.50), 0 0 0 12px rgba(0,180,216,0); }
        }

        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes soundWave {
          0%, 100% { height: 8px; }
          50% { height: 24px; }
        }

        @keyframes spin360 {
          to { transform: rotate(360deg); }
        }

        .call-wave-bar {
          width: 3px;
          background: #00B4D8;
          border-radius: 99px;
          animation: soundWave 0.7s ease-in-out infinite;
        }
        .call-wave-bar:nth-child(2) { animation-delay: 0.1s; }
        .call-wave-bar:nth-child(3) { animation-delay: 0.2s; }
        .call-wave-bar:nth-child(4) { animation-delay: 0.3s; }
        .call-wave-bar:nth-child(5) { animation-delay: 0.15s; }
      `}</style>

            {renderTrigger()}

            {/* ── Modal Overlay ── */}
            {open && (
                <div
                    id="ai-call-modal-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleClose();
                    }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        background: "rgba(11,26,46,0.55)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                    }}
                >
                    <div
                        id="ai-call-modal"
                        style={{
                            width: "100%",
                            maxWidth: 420,
                            background: "var(--bg-1)",
                            border: "1px solid var(--border-strong)",
                            borderRadius: 20,
                            boxShadow: "0 24px 80px rgba(0,30,80,0.25)",
                            overflow: "hidden",
                            animation: "modalSlideIn 250ms cubic-bezier(0.34,1.56,0.64,1) both",
                        }}
                    >
                        {/* Modal header */}
                        <div
                            style={{
                                padding: "20px 22px 16px",
                                borderBottom: "1px solid var(--border)",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                background: "linear-gradient(135deg, rgba(0,119,182,0.06), rgba(0,180,216,0.03))",
                            }}
                        >
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 12,
                                    background: "linear-gradient(135deg, #0077B6, #00B4D8)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    boxShadow: "0 4px 12px rgba(0,119,182,0.35)",
                                }}
                            >
                                <Phone size={18} color="white" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>
                                    AI Voice Agent
                                </div>
                                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 1 }}>
                                    Powered by ElevenLabs · YachtSense AI
                                </div>
                            </div>
                            {callState !== "calling" && callState !== "active" && (
                                <button
                                    id="ai-call-modal-close"
                                    onClick={handleClose}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: 8,
                                        background: "var(--bg-2)",
                                        border: "1px solid var(--border)",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--text-2)",
                                        transition: "all 150ms",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "var(--bg-3)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "var(--bg-2)";
                                    }}
                                >
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        {/* Modal body */}
                        <div style={{ padding: "22px" }}>

                            {/* ── IDLE: input phone number ── */}
                            {(callState === "idle" || callState === "error") && (
                                <div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            color: "var(--text-2)",
                                            marginBottom: 18,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        L&apos;AI Agent YachtSense ti chiamerà direttamente al numero indicato. La chiamata è gestita tramite ElevenLabs Conversational AI.
                                    </div>

                                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-2)", marginBottom: 6, letterSpacing: "0.03em" }}>
                                        NUMERO DI TELEFONO
                                    </label>
                                    <input
                                        ref={inputRef}
                                        id="ai-call-phone-input"
                                        type="tel"
                                        placeholder="+39 331 123 4567"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value);
                                            if (callState === "error") setCallState("idle");
                                            setErrorMsg("");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleCall();
                                        }}
                                        style={{
                                            width: "100%",
                                            padding: "11px 14px",
                                            background: "var(--bg-2)",
                                            border: `1px solid ${errorMsg ? "var(--red)" : "var(--border)"}`,
                                            borderRadius: 10,
                                            color: "var(--text-1)",
                                            fontSize: 15,
                                            fontFamily: "inherit",
                                            outline: "none",
                                            transition: "border-color 150ms, box-shadow 150ms",
                                            letterSpacing: "0.02em",
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = "var(--accent)";
                                            e.target.style.boxShadow = "0 0 0 3px var(--accent-ring)";
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errorMsg ? "var(--red)" : "var(--border)";
                                            e.target.style.boxShadow = "none";
                                        }}
                                    />

                                    {errorMsg && (
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                                marginTop: 8,
                                                fontSize: 12,
                                                color: "var(--red)",
                                            }}
                                        >
                                            <AlertCircle size={13} />
                                            {errorMsg}
                                        </div>
                                    )}

                                    {/* Info chips */}
                                    <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
                                        {["🇮🇹 +39", "🇬🇧 +44", "🇺🇸 +1", "🇫🇷 +33"].map((flag) => (
                                            <button
                                                key={flag}
                                                onClick={() => {
                                                    const code = flag.split(" ")[1];
                                                    if (!phoneNumber.startsWith(code)) {
                                                        setPhoneNumber(code + " ");
                                                        inputRef.current?.focus();
                                                    }
                                                }}
                                                style={{
                                                    padding: "4px 10px",
                                                    background: "var(--bg-2)",
                                                    border: "1px solid var(--border)",
                                                    borderRadius: 6,
                                                    fontSize: 12,
                                                    color: "var(--text-2)",
                                                    cursor: "pointer",
                                                    fontFamily: "inherit",
                                                    transition: "all 150ms",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = "var(--accent)";
                                                    e.currentTarget.style.color = "var(--accent)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = "var(--border)";
                                                    e.currentTarget.style.color = "var(--text-2)";
                                                }}
                                            >
                                                {flag}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        id="ai-call-start-btn"
                                        onClick={handleCall}
                                        style={{
                                            width: "100%",
                                            marginTop: 20,
                                            padding: "12px",
                                            background: "linear-gradient(135deg, #0077B6, #00B4D8)",
                                            color: "white",
                                            border: "none",
                                            borderRadius: 10,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 8,
                                            boxShadow: "0 4px 16px rgba(0,119,182,0.35)",
                                            transition: "all 200ms ease",
                                            fontFamily: "inherit",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-1px)";
                                            e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,119,182,0.45)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,119,182,0.35)";
                                        }}
                                    >
                                        <Phone size={15} />
                                        Avvia Chiamata AI
                                    </button>

                                    <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-3)", marginTop: 12 }}>
                                        La chiamata partirà al tuo numero entro pochi secondi
                                    </p>
                                </div>
                            )}

                            {/* ── CALLING ── */}
                            {callState === "calling" && (
                                <div style={{ textAlign: "center", padding: "24px 0" }}>
                                    <div
                                        style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, rgba(0,119,182,0.12), rgba(0,180,216,0.08))",
                                            border: "2px solid rgba(0,180,216,0.3)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto 16px",
                                            position: "relative",
                                        }}
                                    >
                                        <Loader2
                                            size={28}
                                            color="#00B4D8"
                                            style={{ animation: "spin360 1s linear infinite" }}
                                        />
                                        <span
                                            style={{
                                                position: "absolute",
                                                inset: -8,
                                                borderRadius: "50%",
                                                border: "2px solid rgba(0,180,216,0.20)",
                                                animation: "aiCallPulse 1.5s ease-in-out infinite",
                                            }}
                                        />
                                    </div>
                                    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-1)", marginBottom: 6 }}>
                                        Connessione in corso…
                                    </div>
                                    <div style={{ fontSize: 13, color: "var(--text-3)" }}>
                                        {phoneNumber}
                                    </div>
                                    <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 8 }}>
                                        L&apos;AI Agent starà chiamando il tuo numero
                                    </div>
                                </div>
                            )}

                            {/* ── ACTIVE ── */}
                            {callState === "active" && (
                                <div style={{ textAlign: "center", padding: "20px 0" }}>
                                    {/* Sound wave animation */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 4,
                                            height: 40,
                                            marginBottom: 16,
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <span
                                                key={i}
                                                className="call-wave-bar"
                                                style={{ animationDelay: `${i * 0.08}s` }}
                                            />
                                        ))}
                                    </div>

                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 6,
                                            padding: "4px 12px",
                                            background: "rgba(10,124,78,0.10)",
                                            border: "1px solid rgba(10,124,78,0.25)",
                                            borderRadius: 99,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "var(--green)",
                                            marginBottom: 12,
                                        }}
                                    >
                                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
                                        In chiamata · {formatTime(callSeconds)}
                                    </div>

                                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>
                                        AI Agent Attivo
                                    </div>
                                    <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 20 }}>
                                        {phoneNumber}
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            justifyContent: "center",
                                            marginBottom: 20,
                                            padding: "10px 16px",
                                            background: "var(--bg-2)",
                                            borderRadius: 10,
                                            border: "1px solid var(--border)",
                                        }}
                                    >
                                        <Mic size={13} color="var(--accent)" />
                                        <span style={{ fontSize: 12, color: "var(--text-2)" }}>
                                            YachtSense AI sta parlando con te
                                        </span>
                                    </div>

                                    <button
                                        id="ai-call-end-btn"
                                        onClick={handleEndCall}
                                        style={{
                                            width: "100%",
                                            padding: "11px",
                                            background: "var(--red)",
                                            color: "white",
                                            border: "none",
                                            borderRadius: 10,
                                            fontSize: 13,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 8,
                                            fontFamily: "inherit",
                                            transition: "opacity 150ms",
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                    >
                                        <PhoneOff size={14} />
                                        Termina Chiamata
                                    </button>
                                </div>
                            )}

                            {/* ── ENDED ── */}
                            {callState === "ended" && (
                                <div style={{ textAlign: "center", padding: "24px 0" }}>
                                    <CheckCircle2 size={48} color="var(--green)" style={{ marginBottom: 14 }} />
                                    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-1)", marginBottom: 6 }}>
                                        Chiamata Terminata
                                    </div>
                                    <div style={{ fontSize: 13, color: "var(--text-3)" }}>
                                        Durata: {formatTime(callSeconds)}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {(callState === "idle" || callState === "error") && (
                            <div
                                style={{
                                    padding: "12px 22px",
                                    borderTop: "1px solid var(--border)",
                                    background: "var(--bg-2)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <div
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: 4,
                                        background: "linear-gradient(135deg, #0077B6, #00B4D8)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <span style={{ fontSize: 8, color: "white", fontWeight: 700, lineHeight: 1 }}>AI</span>
                                </div>
                                <span style={{ fontSize: 11, color: "var(--text-3)" }}>
                                    Agente: <strong style={{ color: "var(--text-2)" }}>YachtSense Virtual Manager</strong> · ElevenLabs ConvAI
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
