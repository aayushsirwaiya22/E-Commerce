import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Card } from "../ui";
import { productImage } from "../api";

export function discountPct(pprice, oprice) {
    if (!pprice || !oprice || oprice >= pprice) return 0;
    return Math.round(((pprice - oprice) / pprice) * 100);
}

function ProductCard({ item }) {
    const pct = discountPct(item.pprice, item.oprice);
    return (
        <Card className="group flex flex-col overflow-hidden !rounded-none !shadow-none ring-0 transition hover:shadow-[0_4px_20px_rgba(40,44,63,0.12)]">
            <div className="relative overflow-hidden bg-white">
                <Link to={`/modern/product/${item.pid}`}>
                    <img
                        src={productImage(item.ppicname)}
                        alt={item.pname}
                        loading="lazy"
                        className="h-64 w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                </Link>
            </div>
            <div className="flex flex-1 flex-col px-3 pb-4 pt-2">
                <Link to={`/modern/product/${item.pid}`} className="truncate font-display text-sm font-bold text-ink-900">{item.pname}</Link>
                <p className="truncate text-[13px] text-ink-600">{item.pname} · ID #{item.pid}</p>
                <p className="mt-1 flex items-baseline gap-1.5 text-sm">
                    <span className="font-display font-extrabold">Rs. {item.oprice}</span>
                    {pct > 0 && (
                        <>
                            <span className="text-[13px] text-ink-600 line-through">Rs. {item.pprice}</span>
                            <span className="text-[13px] font-bold text-accent-500">({pct}% OFF)</span>
                        </>
                    )}
                </p>
                <Button
                    className="mt-2 w-full !rounded-md"
                    onClick={() => toast.success(`${item.pname} — bag arrives with the cart phase`)}
                >
                    ADD TO BAG
                </Button>
            </div>
        </Card>
    );
}

export default ProductCard;
