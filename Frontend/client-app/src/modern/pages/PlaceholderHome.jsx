import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Skeleton, EmptyState, SectionTitle } from "../ui";
import { useGsap, useReveal, gsap } from "../motion";
import { fetchProducts, fetchCategories } from "../api";
import ProductCard from "../components/ProductCard";

const CIRCLE_COLORS = ["bg-brand-50 text-brand-600", "bg-amber-50 text-amber-700", "bg-emerald-50 text-emerald-700", "bg-sky-50 text-sky-700", "bg-violet-50 text-violet-700", "bg-rose-50 text-rose-700"];

function PlaceholderHome() {
    const [items, setItems] = useState([]);
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    const revealRef = useReveal();
    const heroRef = useGsap((q) => {
        gsap.from(q(".hero-line"), { y: 30, opacity: 0, duration: 0.7, stagger: 0.09, ease: "power3.out" });
    }, []);

    useEffect(() => {
        Promise.all([fetchProducts(), fetchCategories()])
            .then(([p, c]) => {
                setItems((p || []).slice(0, 8));
                setCats(c || []);
            })
            .catch(() => {
                setItems([]);
                setCats([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div ref={heroRef}>
            {/* Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-brand-50 via-white to-amber-50">
                <Container className="relative py-12 sm:py-16">
                    <p className="hero-line font-display text-xs font-extrabold uppercase tracking-[0.22em] text-brand-600">
                        Big Saving Days · live now
                    </p>
                    <h1 className="hero-line mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Fashion & essentials, up to 50% off
                    </h1>
                    <p className="hero-line mt-3 max-w-xl text-[15px] text-ink-600">
                        Groceries, gadgets, home needs — top-rated picks refreshed daily.
                    </p>
                    <div className="hero-line mt-6 flex flex-wrap gap-3">
                        <Link to="/modern/shop">
                            <Button className="px-8">SHOP NOW</Button>
                        </Link>
                        <Link to="/vendormain/vendorreg">
                            <Button variant="ghost" className="px-8">BECOME A SELLER</Button>
                        </Link>
                    </div>
                </Container>
            </div>

            {/* Categories */}
            {!loading && cats.length > 0 && (
                <Container className="pt-8">
                    <p className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-ink-900">Shop by category</p>
                    <div className="flex gap-5 overflow-x-auto pb-2">
                        {cats.map((c, i) => (
                            <Link key={c.PCatgId} to={`/modern/shop?cat=${c.PCatgId}`} className="flex w-20 shrink-0 flex-col items-center gap-2">
                                <span className={`flex h-20 w-20 items-center justify-center rounded-full font-display text-2xl font-extrabold ring-1 ring-slate-200 transition hover:ring-2 hover:ring-brand-500 ${CIRCLE_COLORS[i % CIRCLE_COLORS.length]}`}>
                                    {String(c.PCatgName || "?").charAt(0).toUpperCase()}
                                </span>
                                <span className="text-center text-xs font-bold leading-tight">{c.PCatgName}</span>
                            </Link>
                        ))}
                    </div>
                </Container>
            )}

            {/* Trending */}
            <Container ref={revealRef} className="py-10">
                <SectionTitle kicker="Deal of the day" title="Trending now" hint="Live products from your backend." />
                {loading ? (
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Skeleton key={i} className="h-80" />)}
                    </div>
                ) : items.length ? (
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {items.map((item) => <ProductCard key={item.pid} item={item} />)}
                    </div>
                ) : (
                    <EmptyState title="No products right now" hint="Start the backend on port 9669 and reload this page." />
                )}
            </Container>
        </div>
    );
}

export default PlaceholderHome;
