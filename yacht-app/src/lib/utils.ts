import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
    return new Intl.NumberFormat("it-IT").format(n);
}

export function formatCurrency(n: number): string {
    return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
    }).format(n);
}

export function healthColor(score: number): string {
    if (score >= 85) return "text-emerald-400";
    if (score >= 65) return "text-amber-400";
    return "text-red-400";
}

export function healthBg(score: number): string {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 65) return "bg-amber-500";
    return "bg-red-500";
}

export function statusColor(status: string): string {
    switch (status) {
        case "active":
            return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
        case "maintenance":
            return "text-amber-400 bg-amber-400/10 border-amber-400/20";
        case "offline":
            return "text-slate-400 bg-slate-400/10 border-slate-400/20";
        default:
            return "text-slate-400";
    }
}

export function alertColor(type: string): string {
    switch (type) {
        case "critical":
            return "text-red-400 bg-red-400/10 border-red-400/20";
        case "warning":
            return "text-amber-400 bg-amber-400/10 border-amber-400/20";
        case "info":
            return "text-sky-400 bg-sky-400/10 border-sky-400/20";
        default:
            return "text-slate-400";
    }
}

export function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}
