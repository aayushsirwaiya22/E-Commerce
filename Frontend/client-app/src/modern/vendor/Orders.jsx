import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Badge, Skeleton, EmptyState } from "../ui";
import { useGsap, gsap } from "../motion";
import { fetchVendorProducts, fetchBills, fetchProducts, fetchCustomers } from "../api";
import { useVendorId } from "./VendorStudio";

function Orders() {
    const [vid] = useVendorId();
    const [bills, setBills] = useState([]);
    const [names, setNames] = useState(new Map());
    const [prices, setPrices] = useState(new Map());
    const [loading, setLoading] = useState(!!vid);

    const ref = useGsap((q) => {
        gsap.from(q(".ord-card"), { y: 26, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power3.out" });
    }, [loading]);

    useEffect(() => {
        if (!vid) {
            setLoading(false);
            return;
        }
        setLoading(true);
        Promise.all([fetchVendorProducts(vid), fetchBills(), fetchProducts(), fetchCustomers()])
            .then(([mine, all, prods, custs]) => {
                const myPids = new Set((mine || []).map((p) => p.pid));
                setBills((all || []).filter((b) => myPids.has(b.pid)));
                setPrices(new Map((prods || []).map((p) => [p.pid, { name: p.pname, price: Number(p.oprice) || 0 }])));
                setNames(new Map((custs || []).map((c) => [c.Cid, c.CustomerName])));
            })
            .catch(() => setBills([]))
            .finally(() => setLoading(false));
    }, [vid]);

    const orders = useMemo(() => {
        const groups = new Map();
        for (const b of bills) {
            if (!groups.has(b.billid)) groups.set(b.billid, { billid: b.billid, date: b.billdate, cid: b.cid, lines: [] });
            groups.get(b.billid).lines.push(b);
        }
        return [...groups.values()].sort((a, b) => b.billid - a.billid);
    }, [bills]);

    if (!vid) {
        return (
            <EmptyState
                title="Connect your vendor account first"
                hint="Orders are matched to your Vendor ID."
                action={<Link to="/modern/vendor"><Button>Go to overview</Button></Link>}
            />
        );
    }

    if (loading) {
        return (
            <div className="grid gap-4 lg:grid-cols-2">
                {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-44" />)}
            </div>
        );
    }

    if (!orders.length) {
        return (
            <EmptyState
                title="No orders yet"
                hint="When shoppers buy your products, each bill lands here with the customer and total."
            />
        );
    }

    const revenue = orders.reduce(
        (s, o) => s + o.lines.reduce((t, l) => t + (prices.get(l.pid)?.price || 0), 0),
        0
    );

    return (
        <div ref={ref}>
            <p className="mb-4 text-sm text-ink-600">
                <strong className="text-ink-900">{orders.length}</strong> orders · <strong className="text-ink-900">₹{revenue.toLocaleString("en-IN")}</strong> revenue
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
                {orders.map((o) => {
                    const total = o.lines.reduce((t, l) => t + (prices.get(l.pid)?.price || 0), 0);
                    return (
                        <Card key={o.billid} className="ord-card p-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="font-display font-extrabold">Bill #{o.billid}</p>
                                <Badge tone="green">{o.lines[0]?.status || "Success"}</Badge>
                            </div>
                            <p className="mt-1 text-sm text-ink-600">
                                {names.get(o.cid) || `Customer #${o.cid}`} · {o.date}
                            </p>
                            <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
                                {o.lines.map((l, i) => (
                                    <li key={i} className="flex justify-between gap-2">
                                        <span className="truncate">{prices.get(l.pid)?.name || `Product #${l.pid}`}</span>
                                        <span className="font-bold">₹{(prices.get(l.pid)?.price || 0).toLocaleString("en-IN")}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3 flex justify-between border-t border-slate-100 pt-3 font-display font-extrabold">
                                <span>Total</span>
                                <span>₹{total.toLocaleString("en-IN")}</span>
                            </p>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default Orders;
