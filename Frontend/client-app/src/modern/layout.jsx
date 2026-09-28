import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "./ui";

export function ModernHeader() {
    const [q, setQ] = useState("");
    const navigate = useNavigate();
    const go = (e) => {
        e.preventDefault();
        navigate(q.trim() ? `/modern/shop?q=${encodeURIComponent(q.trim())}` : "/modern/shop");
    };
    return (
        <header className="sticky top-0 z-40 bg-white shadow-[0_2px_12px_rgba(40,44,63,0.08)]">
            <Container className="flex h-16 items-center gap-4 lg:gap-8">
                <Link to="/modern" className="shrink-0 font-display text-xl font-extrabold tracking-tight text-ink-900">
                    Shop<span className="text-brand-500">Kart</span>
                </Link>
                <nav className="hidden items-center gap-6 font-display text-sm font-bold tracking-wide text-ink-900 lg:flex">
                    <Link className="border-b-2 border-transparent py-5 transition hover:border-brand-500 hover:text-brand-600" to="/modern">HOME</Link>
                    <Link className="border-b-2 border-transparent py-5 transition hover:border-brand-500 hover:text-brand-600" to="/modern/shop">SHOP</Link>
                    <Link className="border-b-2 border-transparent py-5 transition hover:border-brand-500 hover:text-brand-600" to="/modern/vendor">SELL</Link>
                </nav>
                <form onSubmit={go} className="hidden min-w-0 flex-1 items-center gap-2 rounded-md bg-mist px-3 py-2 md:flex">
                    <span className="text-ink-600">⌕</span>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search for products, brands and more"
                        className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-600"
                    />
                </form>
                <div className="ml-auto flex shrink-0 items-center gap-4 md:ml-0">
                    <Link to="/customermain/customerlogin" className="flex flex-col items-center gap-0.5 text-[11px] font-bold text-ink-900 hover:text-brand-600">
                        <span className="text-lg leading-none">👤</span>Profile
                    </Link>
                    <Link to="/modern/shop" className="flex flex-col items-center gap-0.5 text-[11px] font-bold text-ink-900 hover:text-brand-600">
                        <span className="text-lg leading-none">♡</span>Wishlist
                    </Link>
                    <Link to="/modern/shop" className="flex flex-col items-center gap-0.5 text-[11px] font-bold text-ink-900 hover:text-brand-600">
                        <span className="text-lg leading-none">🛍</span>Bag
                    </Link>
                </div>
            </Container>
            <form onSubmit={go} className="flex items-center gap-2 border-t border-slate-100 px-4 py-2 md:hidden">
                <span className="text-ink-600">⌕</span>
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search for products, brands and more"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-ink-600"
                />
            </form>
        </header>
    );
}

export function ModernFooter() {
    return (
        <footer className="mt-16 border-t border-slate-200 bg-white">
            <Container className="grid gap-8 py-10 text-sm sm:grid-cols-3">
                <div>
                    <p className="font-display text-xs font-extrabold uppercase tracking-widest text-ink-900">Shop online</p>
                    <ul className="mt-3 space-y-2 text-ink-600">
                        <li><Link className="hover:text-brand-600" to="/modern/shop">All products</Link></li>
                        <li><Link className="hover:text-brand-600" to="/modern/vendor">Become a seller</Link></li>
                        <li><Link className="hover:text-brand-600" to="/modern/admin">Admin console</Link></li>
                    </ul>
                </div>
                <div>
                    <p className="font-display text-xs font-extrabold uppercase tracking-widest text-ink-900">Help</p>
                    <ul className="mt-3 space-y-2 text-ink-600">
                        <li>Track your order in Bills</li>
                        <li>Secure Razorpay checkout</li>
                        <li>7-day easy replacement</li>
                    </ul>
                </div>
                <div>
                    <p className="font-display text-xs font-extrabold uppercase tracking-widest text-ink-900">ShopKart promise</p>
                    <p className="mt-3 font-display text-2xl font-extrabold text-ink-900">100% ORIGINAL <span className="text-brand-500">✓</span></p>
                    <p className="mt-1 text-ink-600">Quality checked · Fast delivery</p>
                </div>
            </Container>
            <div className="border-t border-slate-100 py-4 text-center text-xs text-ink-600">ShopKart · Express + MongoDB · Payments: Razorpay</div>
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
