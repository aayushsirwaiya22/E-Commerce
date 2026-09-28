import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Input, Skeleton, EmptyState, Badge } from "../ui";
import { useGsap, gsap } from "../motion";
import { fetchVendorProducts, fetchBills, fetchProducts } from "../api";
import { useVendorId } from "./VendorStudio";

function Stat({ label, value, sub }) {
    return (
        <Card className="stat-card p-5">
            <p className="text-sm font-semibold text-ink-600">{label}</p>
            <p className="mt-1 font-display text-3xl font-extrabold text-ink-900">{value}</p>
            {sub && <p className="mt-1 text-xs text-ink-600">{sub}</p>}
        </Card>
    );
}

function VendorDash({ upcoming }) {
    const [vid, saveVid] = useVendorId();
    const [draft, setDraft] = useState(vid);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(!!vid);

    const ref = useGsap((q) => {
        gsap.from(q(".stat-card"), { y: 26, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });
    }, []);

    useEffect(() => {
        if (!vid) {
            setStats(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        Promise.all([fetchVendorProducts(vid), fetchBills(), fetchProducts()])
            .then(([mine, bills, all]) => {
                const myPids = new Set((mine || []).map((p) => p.pid));
                const priceOf = new Map((all || []).map((p) => [p.pid, Number(p.oprice) || 0]));
                const myOrders = (bills || []).filter((b) => myPids.has(b.pid));
                const revenue = myOrders.reduce((s, b) => s + (priceOf.get(b.pid) || 0), 0);
                const active = (mine || []).filter((p) => String(p.status || "").toLowerCase() === "active").length;
                setStats({
                    products: (mine || []).length,
                    active,
                    orders: myOrders.length,
                    revenue,
                });
            })
            .catch(() => setStats({ products: 0, active: 0, orders: 0, revenue: 0 }))
            .finally(() => setLoading(false));
    }, [vid]);

    if (upcoming) {
        return (
            <EmptyState
                title={`${upcoming} — next up`}
                hint="Dashboard is live. This section is being built right now."
                action={<Link to="/modern/vendor"><Button>Back to overview</Button></Link>}
            />
        );
    }

    if (!vid) {
        return (
            <div ref={ref} className="mx-auto max-w-lg">
                <Card className="p-8 text-center">
                    <h2 className="font-display text-2xl font-extrabold">Connect your vendor account</h2>
                    <p className="mt-2 text-sm text-ink-600">
                        Enter the Vendor ID you received at registration (shown on your registration screen).
                        It stays in this browser only.
                    </p>
                    <div className="mt-5 flex gap-2">
                        <div className="flex-1 text-left">
                            <Input placeholder="e.g. 3" value={draft} onChange={(e) => setDraft(e.target.value)} />
                        </div>
                        <Button onClick={() => draft.trim() && saveVid(draft.trim())}>Connect</Button>
                    </div>
                    <p className="mt-3 text-xs text-ink-600">
                        New here? <Link to="/vendormain/vendorreg" className="font-bold text-brand-700 hover:underline">Register as vendor</Link>
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div ref={ref}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-ink-600">Signed in as vendor <Badge tone="brand">#{vid}</Badge></p>
                <div className="flex gap-2">
                    <Link to="/modern/vendor/add"><Button variant="accent">+ Add Product</Button></Link>
                    <Button variant="ghost" onClick={() => saveVid("")}>Switch account</Button>
                </div>
            </div>
            {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-28" />)}
                </div>
            ) : !stats ? (
                <EmptyState title="Couldn't load stats" hint="Is the backend running on port 9669?" />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Stat label="My products" value={stats.products} sub={`${stats.active} live right now`} />
                    <Stat label="Orders received" value={stats.orders} sub="across all bills" />
                    <Stat label="Revenue" value={`₹${stats.revenue.toLocaleString("en-IN")}`} sub="sum of sold item prices" />
                    <Stat label="Live rate" value={stats.products ? `${Math.round((stats.active / stats.products) * 100)}%` : "—"} sub="share of products active" />
                </div>
            )}
        </div>
    );
}

export default VendorDash;
