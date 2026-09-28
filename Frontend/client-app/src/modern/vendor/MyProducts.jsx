import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Card, Badge, Skeleton, EmptyState } from "../ui";
import { useGsap, gsap } from "../motion";
import { fetchVendorProducts, toggleProductStatus, productImage } from "../api";
import { useVendorId } from "./VendorStudio";

function MyProducts() {
    const [vid] = useVendorId();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(!!vid);
    const [busy, setBusy] = useState(null);

    const ref = useGsap((q) => {
        gsap.from(q(".mp-card"), { y: 26, opacity: 0, duration: 0.55, stagger: 0.06, ease: "power3.out" });
    }, [loading]);

    useEffect(() => {
        if (!vid) {
            setLoading(false);
            return;
        }
        setLoading(true);
        fetchVendorProducts(vid)
            .then((data) => setItems(data || []))
            .catch(() => {
                setItems([]);
                toast.error("Couldn't load your products");
            })
            .finally(() => setLoading(false));
    }, [vid]);

    if (!vid) {
        return (
            <EmptyState
                title="Connect your vendor account first"
                hint="Your Vendor ID tags every product you own."
                action={<Link to="/modern/vendor"><Button>Go to overview</Button></Link>}
            />
        );
    }

    const flip = async (item) => {
        const next = String(item.status || "").toLowerCase() === "active" ? "Inactive" : "Active";
        setBusy(item.pid);
        try {
            await toggleProductStatus(item.pid, next);
            setItems((list) => list.map((p) => (p.pid === item.pid ? { ...p, status: next } : p)));
            toast.success(`“${item.pname}” is now ${next}`);
        } catch (e) {
            toast.error("Toggle failed — try again");
        } finally {
            setBusy(null);
        }
    };

    if (loading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-64" />)}
            </div>
        );
    }

    if (!items.length) {
        return (
            <EmptyState
                title="No products yet"
                hint="Publish your first listing in under a minute."
                action={<Link to="/modern/vendor/add"><Button variant="accent">+ Add Product</Button></Link>}
            />
        );
    }

    const live = items.filter((p) => String(p.status || "").toLowerCase() === "active").length;

    return (
        <div ref={ref}>
            <p className="mb-4 text-sm text-ink-600">
                <strong className="text-ink-900">{items.length}</strong> products · <strong className="text-emerald-700">{live} live</strong>
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => {
                    const active = String(item.status || "").toLowerCase() === "active";
                    return (
                        <Card key={item.pid} className={`mp-card flex flex-col overflow-hidden ${active ? "" : "opacity-75"}`}>
                            <div className="relative bg-white">
                                <Badge tone={active ? "green" : "slate"} className="absolute left-3 top-3 z-10">{active ? "Live" : "Hidden"}</Badge>
                                <img src={productImage(item.ppicname)} alt={item.pname} loading="lazy" className={`h-44 w-full object-contain p-4 ${active ? "" : "grayscale"}`} />
                            </div>
                            <div className="flex flex-1 flex-col gap-1 p-4">
                                <p className="truncate font-display text-sm font-bold">{item.pname}</p>
                                <p className="text-sm text-ink-600">ID #{item.pid} · ₹{item.oprice} <span className="line-through">₹{item.pprice}</span></p>
                                <Button
                                    variant={active ? "ghost" : "primary"}
                                    className="mt-2 w-full"
                                    disabled={busy === item.pid}
                                    onClick={() => flip(item)}
                                >
                                    {busy === item.pid ? "Saving…" : active ? "Hide (Inactive)" : "Go Live (Active)"}
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default MyProducts;
