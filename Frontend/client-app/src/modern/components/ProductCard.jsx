import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Badge, Button, Card } from "../ui";
import { productImage } from "../api";

export function discountPct(pprice, oprice) {
    if (!pprice || !oprice || oprice >= pprice) return 0;
    return Math.round(((pprice - oprice) / pprice) * 100);
}

function ProductCard({ item }) {
    const pct = discountPct(item.pprice, item.oprice);
    return (
        <Card className="group flex flex-col overflow-hidden">
            <div className="relative overflow-hidden bg-white">
                {pct > 0 && (
                    <Badge tone="green" className="absolute left-3 top-3 z-10">{pct}% off</Badge>
                )}
                <Link to={`/modern/product/${item.pid}`}>
                    <img
                        src={productImage(item.ppicname)}
                        alt={item.pname}
                        loading="lazy"
                        className="h-52 w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
                <Link to={`/modern/product/${item.pid}`} className="truncate font-display text-sm font-bold text-ink-900 hover:text-brand-700">{item.pname}</Link>
                <p className="flex items-baseline gap-2">
                    <span className="font-display text-lg font-extrabold">₹{item.oprice}</span>
                    {pct > 0 && <span className="text-sm text-ink-600 line-through">₹{item.pprice}</span>}
                </p>
                <Button
                    className="mt-2 w-full"
                    onClick={() => toast.success(`${item.pname} — full shop arrives in Phase 1`)}
                >
                    Buy Now
                </Button>
            </div>
        </Card>
    );
}

export default ProductCard;
