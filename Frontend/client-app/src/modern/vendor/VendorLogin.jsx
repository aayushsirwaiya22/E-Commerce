import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Card, Input } from "../ui";
import { useGsap, gsap } from "../motion";
import { vendorLogin } from "../api";
import { useVendorId } from "./VendorStudio";

function VendorLoginPage() {
    const [, saveVid] = useVendorId();
    const [uid, setUid] = useState("");
    const [pass, setPass] = useState("");
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();

    const ref = useGsap((q) => {
        gsap.from(q(".vl-anim"), { y: 26, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });
    }, []);

    const submit = async () => {
        if (!uid.trim() || !pass) {
            toast.error("Enter your vendor ID and password");
            return;
        }
        setBusy(true);
        try {
            const data = await vendorLogin(uid.trim(), pass);
            if (data && data.VUserId != null && data.Vid != null) {
                saveVid(String(data.Vid));
                toast.success(`Welcome back, ${data.VendorName || "vendor"}`);
                navigate("/modern/vendor");
            } else {
                toast.error("Invalid vendor ID or password");
            }
        } catch (e) {
            toast.error("Login failed — is the backend running?");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div ref={ref} className="mx-auto max-w-md">
            <Card className="vl-anim p-8">
                <h2 className="font-display text-2xl font-extrabold">Vendor sign in</h2>
                <p className="mt-1 text-sm text-ink-600">Password-checked against your registered account. Unknown IDs can't get in.</p>
                <div className="mt-5 flex flex-col gap-4">
                    <Input label="Vendor user ID" placeholder="Your login ID" value={uid} onChange={(e) => setUid(e.target.value)} />
                    <Input label="Password" type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
                    <Button onClick={submit} disabled={busy}>{busy ? "Signing in…" : "Sign in to studio"}</Button>
                </div>
                <p className="mt-4 text-center text-xs text-ink-600">
                    New vendor? <Link to="/vendormain/vendorreg" className="font-bold text-brand-700 hover:underline">Register first</Link>
                </p>
            </Card>
        </div>
    );
}

export default VendorLoginPage;
