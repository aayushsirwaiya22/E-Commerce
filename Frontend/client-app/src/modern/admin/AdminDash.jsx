import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Skeleton, EmptyState } from "../ui";
import { useGsap, gsap } from "../motion";
import { fetchCustomers, fetchVendors, fetchProducts, fetchBills } from "../api";

function AdminDash() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const ref = useGsap((q) => {
        gsap.from(q(".ad-card"), { y: 26, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" });
    }, [loading]);

    useEffect(() => {
        Promise.all([fetchCustomers(), fetchVendors(), fetchProducts(), fetchBills()])
            .then(([custs, vends, prods, bills]) => {
                const priceOf = new Map((prods || []).map((p) => [p.pid, Number(p.oprice) || 0]));
                setStats({
                    customers: (custs || []).length,
                    pendingCust: (custs || []).filter((c) => String(c.Status || "").toLowerCase() !== "active").length,
                    vendors: (vends || []).length,
                    pendingVend: (vends || []).filter((v) => String(v.Status || "").toLowerCase() !== "active").length,
                    products: (prods || []).length,
                    inactiveProd: (prods || []).filter((p) => String(p.status || "").toLowerCase() !== "active").length,
                    bills: (bills || []).length,
                    revenue: (bills || []).reduce((s, b) => s + (priceOf.get(b.pid) || 0), 0),
                });
            })
            .catch(() => setStats(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Skeleton key={i} className="h-28" />)}
            </div>
        );
    }

    if (!stats) return <EmptyState title="Couldn't load stats" hint="Is the backend running on port 9669?" />;

    const cards = [
        { label: "Customers", value: stats.customers, sub: `${stats.pendingCust} awaiting activation`, to: "/modern/admin/customers" },
        { label: "Vendors", value: stats.vendors, sub: `${stats.pendingVend} awaiting activation`, to: "/modern/admin/vendors" },
        { label: "Products", value: stats.products, sub: `${stats.inactiveProd} hidden`, to: "/modern/admin/products" },
        { label: "Bills", value: stats.bills, sub: `₹${stats.revenue.toLocaleString("en-IN")} revenue`, to: "/modern/admin/bills" },
    ];

    return (
        <div ref={ref}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((c) => (
                    <Link key={c.label} to={c.to}>
                        <Card className="ad-card p-5 transition hover:-translate-y-1 hover:shadow-xl">
                            <p className="text-sm font-semibold text-ink-600">{c.label}</p>
                            <p className="mt-1 font-display text-3xl font-extrabold">{c.value}</p>
                            <p className="mt-1 text-xs text-ink-600">{c.sub}</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AdminDash;
