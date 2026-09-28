import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Container, Button, Badge, Skeleton, EmptyState } from "../ui";
import { useGsap, gsap } from "../motion";
import { fetchProduct, productImage } from "../api";
import { discountPct } from "../components/ProductCard";

function ProductDetail() {
    const { pid } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    const ref = useGsap((q) => {
        gsap.from(q(".pd-anim"), { y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" });
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchProduct(pid)
            .then((data) => setItem(Array.isArray(data) ? data[0] : data))
            .catch(() => setItem(null))
            .finally(() => setLoading(false));
    }, [pid]);

    if (loading) {
        return (
            <Container className="grid gap-6 py-10 lg:grid-cols-2">
                <Skeleton className="h-96" />
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-8 w-2/3" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-24" />
                </div>
            </Container>
        );
    }

    if (!item) {
        return (
            <Container className="py-10">
                <EmptyState title="Product not found" hint="It may have been removed. Browse the full shelf instead." action={<Link to="/modern/shop"><Button>Back to shop</Button></Link>} />
            </Container>
        );
    }

    const pct = discountPct(item.pprice, item.oprice);

    return (
        <Container ref={ref} className="py-10">
            <Link to="/modern/shop" className="pd-anim text-sm font-semibold text-brand-700 hover:underline">← Back to shop</Link>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
                <div className="pd-anim overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                    <img src={productImage(item.ppicname)} alt={item.pname} className="mx-auto max-h-96 w-auto object-contain" />
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="pd-anim font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{item.pname}</h1>
                    <div className="pd-anim flex items-center gap-2">
                        {pct > 0 ? <Badge tone="green">{pct}% off</Badge> : <Badge tone="slate">New arrival</Badge>}
                        {String(item.status || "").toLowerCase() === "active"
                            ? <Badge tone="green">In stock</Badge>
                            : <Badge tone="red">Out of stock</Badge>}
                    </div>
                    <p className="pd-anim flex items-baseline gap-3">
                        <span className="font-display text-4xl font-extrabold">₹{item.oprice}</span>
                        {pct > 0 && <span className="text-lg text-ink-600 line-through">₹{item.pprice}</span>}
                    </p>
                    <div className="pd-anim mt-2 flex items-center gap-3">
                        <span className="text-sm font-semibold">Qty</span>
                        <div className="flex items-center gap-2 rounded-xl bg-white px-2 py-1 ring-1 ring-slate-200">
                            <button className="px-2 text-lg font-bold" onClick={() => setQty((v) => Math.max(1, v - 1))}>−</button>
                            <span className="w-8 text-center font-bold">{qty}</span>
                            <button className="px-2 text-lg font-bold" onClick={() => setQty((v) => v + 1)}>+</button>
                        </div>
                        <span className="font-display font-extrabold">Total ₹{item.oprice * qty}</span>
                    </div>
                    <div className="pd-anim mt-2 flex flex-wrap gap-3">
                        <Button variant="accent" className="flex-1 px-8 py-3 text-base" onClick={() => toast.success("Checkout plugs in during the cart phase")}>
                            Buy Now
                        </Button>
                    </div>
                    <p className="pd-anim mt-2 text-sm text-ink-600">Free delivery · 7-day replacement · Secure Razorpay checkout</p>
                </div>
            </div>
        </Container>
    );
}

export default ProductDetail;
