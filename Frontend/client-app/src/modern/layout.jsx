import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "./ui";

export function ModernHeader() {
    return (
        <header className="sticky top-0 z-40 bg-brand-600 shadow-md">
            <Container className="flex h-16 items-center justify-between gap-4">
                <Link to="/modern" className="font-display text-xl font-extrabold italic tracking-tight text-white">
                    ShopKart
                    <span className="ml-2 rounded-md bg-accent-400 px-1.5 py-0.5 align-middle font-display text-[10px] font-bold uppercase not-italic text-ink-900">new</span>
                </Link>
                <nav className="hidden items-center gap-6 text-sm font-semibold text-blue-100 md:flex">
                    <Link className="transition hover:text-white" to="/modern">Home</Link>
                    <Link className="transition hover:text-white" to="/modern/shop">Shop</Link>
                    <Link className="transition hover:text-white" to="/modern/vendor">Sell</Link>
                </nav>
                <div className="flex items-center gap-2">
                    <Link to="/customermain/customerlogin">
                        <Button variant="accent">Sign in</Button>
                    </Link>
                </div>
            </Container>
        </header>
    );
}

export function ModernFooter() {
    return (
        <footer className="mt-20 bg-ink-900 py-10 text-slate-300">
            <Container className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
                <p className="font-display font-bold text-white">ShopKart — modern shopping, coming alive.</p>
                <p>Backend: Express + MongoDB · Payments: Razorpay</p>
            </Container>
        </footer>
    );
}

export function ModernShell({ children }) {
    return (
        <div className="min-h-screen bg-mist font-body text-ink-900">
            <ModernHeader />
            <main>{children}</main>
            <ModernFooter />
        </div>
    );
}
