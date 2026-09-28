import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { Container, Button, EmptyState } from "../ui";
import AdminLoginPage from "./AdminLogin";
import AdminDash from "./AdminDash";

const SES_KEY = "mk_admin_session";

export function useAdminSession() {
    const [ses, setSes] = useState(() => {
        try {
            return JSON.parse(sessionStorage.getItem(SES_KEY));
        } catch {
            return null;
        }
    });
    const save = (s) => {
        setSes(s);
        sessionStorage.setItem(SES_KEY, JSON.stringify(s));
    };
    const clear = () => {
        setSes(null);
        sessionStorage.removeItem(SES_KEY);
    };
    return [ses, save, clear];
}

function Soon({ title }) {
    return (
        <EmptyState
            title={`${title} — next up`}
            hint="Dashboard is live. This section is being built right now."
            action={<Link to="/modern/admin"><Button>Back to dashboard</Button></Link>}
        />
    );
}

function AdminConsole() {
    const { pathname } = useLocation();
    const [ses, , clear] = useAdminSession();
    const tabs = [
        { to: "/modern/admin", label: "Dashboard", end: true },
        { to: "/modern/admin/customers", label: "Customers" },
        { to: "/modern/admin/vendors", label: "Vendors" },
        { to: "/modern/admin/products", label: "Products" },
        { to: "/modern/admin/bills", label: "Bills" },
    ];
    return (
        <div className="bg-mist">
            <div className="bg-ink-900 text-white">
                <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-brand-400">Mission control</p>
                        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Admin console.</h1>
                    </div>
                    {ses && (
                        <Button variant="ghost" className="bg-transparent text-white ring-white/20 hover:text-brand-400 hover:ring-brand-500" onClick={clear}>
                            Sign out ({ses.user})
                        </Button>
                    )}
                </Container>
                {ses && (
                    <Container className="flex gap-1 overflow-x-auto pb-0">
                        {tabs.map((t) => {
                            const active = t.end ? pathname === t.to : pathname.startsWith(t.to);
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
                )}
            </div>
            <Container className="py-8">
                {!ses ? (
                    <AdminLoginPage />
                ) : (
                    <Routes>
                        <Route path="/" element={<AdminDash />} />
                        <Route path="/customers" element={<Soon title="Customer approvals" />} />
                        <Route path="/vendors" element={<Soon title="Vendor approvals" />} />
                        <Route path="/products" element={<Soon title="Catalog manager" />} />
                        <Route path="/bills" element={<Soon title="All bills" />} />
                    </Routes>
                )}
            </Container>
        </div>
    );
}

export default AdminConsole;
