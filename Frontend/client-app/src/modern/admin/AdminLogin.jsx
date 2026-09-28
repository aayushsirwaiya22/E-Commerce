import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button, Card, Input } from "../ui";
import { useGsap, gsap } from "../motion";
import { adminLogin } from "../api";
import { useAdminSession } from "./AdminConsole";

function AdminLoginPage() {
    const [, save] = useAdminSession();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [busy, setBusy] = useState(false);

    const ref = useGsap((q) => {
        gsap.from(q(".al-anim"), { y: 26, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });
    }, []);

    const submit = async () => {
        if (!user.trim() || !pass) {
            toast.error("Enter admin ID and password");
            return;
        }
        setBusy(true);
        try {
            const data = await adminLogin(user.trim(), pass);
            if (data && data.ok) {
                save({ user: data.user });
                toast.success("Welcome to mission control");
            } else {
                toast.error("Invalid admin credentials");
            }
        } catch (e) {
            toast.error("Login failed — is the backend running?");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div ref={ref} className="mx-auto max-w-md">
            <Card className="al-anim border-t-4 border-t-ink-900 p-8">
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink-600">Restricted area</p>
                <h2 className="mt-1 font-display text-2xl font-extrabold">Admin sign in</h2>
                <div className="mt-5 flex flex-col gap-4">
                    <Input label="Admin ID" placeholder="Administrator ID" value={user} onChange={(e) => setUser(e.target.value)} />
                    <Input label="Password" type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
                    <Button variant="dark" onClick={submit} disabled={busy}>{busy ? "Checking…" : "Enter console"}</Button>
                </div>
            </Card>
        </div>
    );
}

export default AdminLoginPage;
