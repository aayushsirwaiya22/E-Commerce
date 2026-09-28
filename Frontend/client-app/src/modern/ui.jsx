import React from "react";

export function Container({ children, className = "", ref }) {
    return <div ref={ref} className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Button({ children, variant = "primary", className = "", ...rest }) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-display text-sm font-bold transition-all duration-200 active:scale-95 disabled:opacity-50";
    const styles = {
        primary: "bg-brand-500 text-white shadow-md shadow-brand-500/25 hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5",
        accent: "bg-brand-50 text-brand-700 ring-1 ring-brand-500 hover:bg-brand-100 hover:-translate-y-0.5",
        ghost: "bg-white text-ink-900 ring-1 ring-slate-300 hover:ring-brand-500 hover:text-brand-600",
        dark: "bg-ink-900 text-white hover:bg-black",
    };
    return (
        <button className={`${base} ${styles[variant] || styles.primary} ${className}`} {...rest}>
            {children}
        </button>
    );
}

export function Card({ children, className = "" }) {
    return (
        <div className={`rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow duration-300 hover:shadow-xl ${className}`}>
            {children}
        </div>
    );
}

export function Input({ label, className = "", ...rest }) {
    return (
        <label className="block">
            {label && <span className="mb-1.5 block font-display text-sm font-semibold text-ink-900">{label}</span>}
            <input
                className={`w-full rounded-xl border-0 bg-slate-100 px-4 py-2.5 text-sm text-ink-900 ring-1 ring-transparent outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-500 ${className}`}
                {...rest}
            />
        </label>
    );
}

export function Badge({ children, tone = "brand", className = "" }) {
    const tones = {
        brand: "bg-brand-50 text-brand-700",
        accent: "bg-amber-50 text-amber-700",
        green: "bg-emerald-50 text-emerald-700",
        red: "bg-rose-50 text-rose-700",
        slate: "bg-slate-100 text-ink-600",
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-display text-xs font-bold ${tones[tone]} ${className}`}>
            {children}
        </span>
    );
}

export function Skeleton({ className = "" }) {
    return <div className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`} />;
}

export function EmptyState({ title, hint, action }) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-slate-50 px-6 py-14 text-center">
            <p className="font-display text-lg font-bold text-ink-900">{title}</p>
            {hint && <p className="max-w-sm text-sm text-ink-600">{hint}</p>}
            {action}
        </div>
    );
}

export function SectionTitle({ kicker, title, hint }) {
    return (
        <div className="reveal mb-8 max-w-2xl">
            {kicker && <p className="mb-2 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">{kicker}</p>}
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">{title}</h2>
            {hint && <p className="mt-2 text-ink-600">{hint}</p>}
        </div>
    );
}
