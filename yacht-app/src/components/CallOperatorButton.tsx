"use client";

import { useState } from "react";
import { Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const OPERATOR_NUMBER = "+393331903954";

interface Props {
    /** Optional label override */
    label?: string;
    /** compact = small pill (default), full = full-width */
    size?: "compact" | "full";
}

export default function CallOperatorButton({ label = "Call the Operator", size = "compact" }: Props) {
    const [state, setState] = useState<"idle" | "calling" | "done" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleCall = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Don't trigger parent row clicks
        setState("calling");
        setErrorMsg("");

        try {
            const res = await fetch("/api/elevenlabs-call", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ to_number: OPERATOR_NUMBER }),
            });
            const data = await res.json();
            if (!res.ok || data.error) {
                throw new Error(data.detail?.detail ?? data.detail?.message ?? data.error ?? "Error");
            }
            setState("done");
            setTimeout(() => setState("idle"), 3500);
        } catch (err: any) {
            setErrorMsg(err.message ?? "Failed");
            setState("error");
            setTimeout(() => setState("idle"), 4000);
        }
    };

    const isCompact = size === "compact";

    const baseStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: isCompact ? 5 : 7,
        padding: isCompact ? "5px 10px" : "8px 14px",
        borderRadius: isCompact ? 6 : 9,
        fontSize: isCompact ? 11 : 13,
        fontWeight: 600,
        cursor: state === "calling" ? "not-allowed" : "pointer",
        border: "none",
        fontFamily: "inherit",
        transition: "all 180ms ease",
        whiteSpace: "nowrap" as const,
        flexShrink: 0,
        width: size === "full" ? "100%" : undefined,
        justifyContent: size === "full" ? "center" : undefined,
    };

    if (state === "calling") {
        return (
            <button style={{ ...baseStyle, background: "rgba(0,119,182,0.10)", color: "var(--accent)", opacity: 0.85 }} disabled>
                <Loader2 size={isCompact ? 11 : 13} style={{ animation: "spin 0.8s linear infinite" }} />
                Calling…
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </button>
        );
    }

    if (state === "done") {
        return (
            <button style={{ ...baseStyle, background: "rgba(10,124,78,0.10)", color: "var(--green)" }} disabled>
                <CheckCircle2 size={isCompact ? 11 : 13} />
                Called!
            </button>
        );
    }

    if (state === "error") {
        return (
            <button
                style={{ ...baseStyle, background: "rgba(192,57,43,0.08)", color: "var(--red)" }}
                onClick={handleCall}
                title={errorMsg}
            >
                <AlertCircle size={isCompact ? 11 : 13} />
                Retry call
            </button>
        );
    }

    // idle
    return (
        <button
            style={{
                ...baseStyle,
                background: "linear-gradient(135deg, rgba(0,119,182,0.12), rgba(0,180,216,0.07))",
                color: "var(--accent)",
                border: "1px solid rgba(0,119,182,0.22)",
                boxShadow: "0 1px 4px rgba(0,119,182,0.10)",
            }}
            onClick={handleCall}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,119,182,0.20), rgba(0,180,216,0.12))";
                e.currentTarget.style.borderColor = "rgba(0,119,182,0.40)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,119,182,0.20)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,119,182,0.12), rgba(0,180,216,0.07))";
                e.currentTarget.style.borderColor = "rgba(0,119,182,0.22)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,119,182,0.10)";
            }}
            title={`Call operator at ${OPERATOR_NUMBER}`}
        >
            {/* Subtle pulse dot */}
            <span style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
                <Phone size={isCompact ? 11 : 13} />
                <span style={{
                    position: "absolute",
                    top: -2, right: -2,
                    width: 5, height: 5,
                    borderRadius: "50%",
                    background: "var(--green)",
                    border: "1px solid var(--bg-1)",
                }} />
            </span>
            {label}
        </button>
    );
}
