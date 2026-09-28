import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Input, Skeleton, EmptyState, SectionTitle, Badge } from "../ui";
import { useReveal } from "../motion";
import { fetchProducts, fetchCategories } from "../api";
import ProductCard from "../components/ProductCard";

function Shop() {
    const [params, setParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("pop");

    const cat = params.get("cat") || "all";
    const revealRef = useReveal();

    useEffect(() => {
        setQuery(params.get("q") || "");
    }, [params]);

    useEffect(() => {
        Promise.all([fetchProducts(), fetchCategories()])
            .then(([p, c]) => {
                setItems(p || []);
                setCats(c || []);
            })
            .catch(() => {
                setItems([]);
                setCats([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        let list = items.filter((it) => String(it.status || "Active").toLowerCase() === "active");
        if (cat !== "all") list = list.filter((it) => String(it.pcatgid) === String(cat));
        if (query.trim()) {
            const q = query.trim().toLowerCase();
            list = list.filter((it) => String(it.pname || "").toLowerCase().includes(q));
        }
        if (maxPrice !== "" && !isNaN(Number(maxPrice))) {
            list = list.filter((it) => Number(it.oprice) <= Number(maxPrice));
        }
        const by = {
            pop: () => 0,
            lo: (a, b) => a.oprice - b.oprice,
            hi: (a, b) => b.oprice - a.oprice,
            off: (a, b) => (b.pprice - b.oprice) / b.pprice - (a.pprice - a.oprice) / a.pprice,
        };
        return [...list].sort(by[sort] || by.pop);
    }, [items, cat, query, maxPrice, sort]);

    return (
        <Container ref={revealRef} className="py-10">
            <SectionTitle kicker="The full shelf" title="Shop all products" hint="Search, filter and sort — everything updates instantly." />
            <div className="reveal mb-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 lg:flex-row lg:items-end">
                <div className="flex-1">
                    <Input label="Search products" placeholder="Try 'headphone' or 'fan'…" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                    <label className="block flex-1">
                        <span className="mb-1.5 block font-display text-sm font-semibold text-ink-900">Category</span>
                        <select
                            value={cat}
                            onChange={(e) => setParams(e.target.value === "all" ? {} : { cat: e.target.value })}
                            className="w-full rounded-xl border-0 bg-slate-100 px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                        >
                            <option value="all">All categories</option>
                            {cats.map((c) => (
                                <option key={c.PCatgId} value={c.PCatgId}>{c.PCatgName}</option>
                            ))}
                        </select>
                    </label>
                    <div className="flex-1">
                        <Input label="Max price (₹)" type="number" min="0" placeholder="No limit" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </div>
                    <label className="block flex-1">
                        <span className="mb-1.5 block font-display text-sm font-semibold text-ink-900">Sort by</span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full rounded-xl border-0 bg-slate-100 px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                        >
                            <option value="pop">Popular</option>
                            <option value="lo">Price: low to high</option>
                            <option value="hi">Price: high to low</option>
                            <option value="off">Biggest discount</option>
                        </select>
                    </label>
                </div>
            </div>
            {!loading && (
                <p className="mb-4 text-sm text-ink-600">
                    Showing <strong className="text-ink-900">{filtered.length}</strong> of {items.length} products
                    {cat !== "all" && <Badge tone="brand" className="ml-2">{cats.find((c) => String(c.PCatgId) === String(cat))?.PCatgName}</Badge>}
                </p>
            )}
            {loading ? (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Skeleton key={i} className="h-80" />)}
                </div>
            ) : filtered.length ? (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {filtered.map((item) => <ProductCard key={item.pid} item={item} />)}
                </div>
            ) : (
                <EmptyState title="Nothing matches those filters" hint="Try a different search term or clear the price limit." />
            )}
        </Container>
    );
}

export default Shop;
