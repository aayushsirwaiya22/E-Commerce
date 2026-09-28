import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { Container } from "../ui";
import VendorDash from "./VendorDash";

const VID_KEY = "mk_vendor_vid";

export function useVendorId() {
    const [vid, setVid] = useState(() => localStorage.getItem(VID_KEY) || "");
    const save = (v) => {
        setVid(v);
        if (v) localStorage.setItem(VID_KEY, v);
        else localStorage.removeItem(VID_KEY);
    };
    return [vid, save];
}

function VendorStudio() {
    const { pathname } = useLocation();
    const tabs = [
        { to: "/modern/vendor", label: "Overview", end: true },
        { to: "/modern/vendor/add", label: "Add Product" },
        { to: "/modern/vendor/products", label: "My Products" },
        { to: "/modern/vendor/orders", label: "Orders" },
    ];
    return (
        <div className="bg-mist">
            <div className="bg-ink-900 text-white">
                <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-brand-400">Vendor Studio</p>
                        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Sell smarter, grow faster.</h1>
                    </div>
                    <Link to="/vendormain/vendorlogin" className="text-sm font-semibold text-blue-200 hover:text-white">
                        Use classic vendor login →
                    </Link>
                </Container>
                <Container className="flex gap-1 overflow-x-auto pb-0">
                    {tabs.map((t) => {
                        const active = t.end ? pathname === t.to : pathname.startsWith(t.to + "/") || pathname === t.to;
                        return (
                            <Link
                                key={t.to}
                                to={t.to}
                                className={`whitespace-nowrap rounded-t-xl px-5 py-2.5 font-display text-sm font-bold transition ${active ? "bg-mist text-ink-900" : "text-slate-300 hover:text-white"}`}
                            >
                                {t.label}
                            </Link>
                        );
                    })}
                </Container>
            </div>
            <Container className="py-8">
                <Routes>
                    <Route path="/" element={<VendorDash />} />
                    <Route path="/add" element={<VendorDash upcoming="Add-product wizard" />} />
                    <Route path="/products" element={<VendorDash upcoming="My-products manager" />} />
                    <Route path="/orders" element={<VendorDash upcoming="Orders received" />} />
                </Routes>
            </Container>
        </div>
    );
}

export default VendorStudio;
export { VID_KEY };
