import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Badge, Skeleton, EmptyState, SectionTitle } from "../ui";
import { useGsap, useReveal, gsap } from "../motion";
import { fetchProducts, fetchCategories } from "../api";
import ProductCard from "../components/ProductCard";

function PlaceholderHome() {
    const [items, setItems] = useState([]);
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    const revealRef = useReveal();
    const heroRef = useGsap((q) => {
        gsap.from(q(".hero-line"), { y: 36, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
        gsap.to(q(".float-orb"), { y: -16, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.4 });
    }, []);

    useEffect(() => {
        Promise.all([fetchProducts(), fetchCategories()])
            .then(([p, c]) => {
                setItems((p || []).slice(0, 4));
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
            {/* Hero */}
            <div className="relative overflow-hidden bg-white">
                <div className="float-orb pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-50 blur-3xl" />
                <div className="float-orb pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-amber-50 blur-3xl" />
                <Container className="relative py-14 sm:py-20">
                    <p className="hero-line inline-block rounded-full bg-brand-50 px-3 py-1 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">
                        Big Saving Days · live now
                    </p>
                    <h1 className="hero-line mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                        Everything you love, <span className="text-brand-600">delivered fast.</span>
                    </h1>
                    <p className="hero-line mt-4 max-w-xl text-lg text-ink-600">
                        Groceries, gadgets, home essentials — top deals refreshed daily, secured by Razorpay checkout.
                    </p>
                    <div className="hero-line mt-8 flex flex-wrap gap-3">
                        <Link to="/customermain">
                            <Button variant="accent" className="px-8 py-3 text-base">Shop Now</Button>
                        </Link>
                        <Link to="/vendormain/vendorreg">
                            <Button variant="dark" className="px-8 py-3 text-base">Become a Seller</Button>
                        </Link>
                    </div>
                </Container>
            </div>

            {/* Categories */}
            {!loading && cats.length > 0 && (
                <Container className="flex gap-3 overflow-x-auto py-6">
                    <Link to="/modern/shop">
                        <Badge tone="brand" className="cursor-pointer whitespace-nowrap px-4 py-2 text-sm">All</Badge>
                    </Link>
                    {cats.map((c) => (
                        <Link key={c.PCatgId} to={`/modern/shop?cat=${c.PCatgId}`}>
                            <Badge tone="slate" className="cursor-pointer whitespace-nowrap px-4 py-2 text-sm transition hover:bg-brand-50 hover:text-brand-700">{c.PCatgName}</Badge>
                        </Link>
                    ))}
                </Container>
            )}

            {/* Trending strip (live data) */}
            <Container ref={revealRef} className="py-12">
                <SectionTitle kicker="Fresh from the shelves" title="Trending now" hint="Live products from your backend." />
                {loading ? (
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-80" />)}
                    </div>
                ) : items.length ? (
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
