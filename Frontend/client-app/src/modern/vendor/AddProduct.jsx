import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Card, Input, Badge, Skeleton, EmptyState } from "../ui";
import { useGsap, gsap } from "../motion";
import { fetchCategories, nextProductId, saveProduct, uploadProductImage, productImage } from "../api";
import { useVendorId } from "./VendorStudio";

const STEPS = ["Details", "Photo", "Review"];

function Stepper({ step }) {
    return (
        <div className="mb-8 flex items-center gap-2">
            {STEPS.map((label, i) => {
                const n = i + 1;
                const done = n < step;
                const active = n === step;
                return (
                    <React.Fragment key={label}>
                        <div className="flex items-center gap-2">
                            <span className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-extrabold transition-colors ${done ? "bg-emerald-500 text-white" : active ? "bg-brand-600 text-white" : "bg-slate-200 text-ink-600"}`}>
                                {done ? "✓" : n}
                            </span>
                            <span className={`hidden font-display text-sm font-bold sm:block ${active ? "text-ink-900" : "text-ink-600"}`}>{label}</span>
                        </div>
                        {n < STEPS.length && <div className={`h-0.5 flex-1 rounded ${n < step ? "bg-emerald-500" : "bg-slate-200"}`} />}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

function AddProduct() {
    const [vid] = useVendorId();
    const [step, setStep] = useState(1);
    const [pid, setPid] = useState(null);
    const [cats, setCats] = useState([]);
    const [name, setName] = useState("");
    const [cat, setCat] = useState("");
    const [price, setPrice] = useState("");
    const [offer, setOffer] = useState("");
    const [status, setStatus] = useState("Active");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [publishing, setPublishing] = useState(false);
    const [done, setDone] = useState(false);

    const ref = useGsap((q) => {
        gsap.from(q(".wz-anim"), { y: 24, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power3.out" });
    }, [step, done]);

    useEffect(() => {
        Promise.all([nextProductId(), fetchCategories()])
            .then(([id, c]) => {
                setPid(id);
                setCats(c || []);
                if (c && c.length) setCat(String(c[0].PCatgId));
            })
            .catch(() => toast.error("Couldn't reach the backend"));
    }, []);

    if (!vid) {
        return (
            <EmptyState
                title="Connect your vendor account first"
                hint="The wizard needs your Vendor ID to tag the product."
                action={<Link to="/modern/vendor"><Button>Go to overview</Button></Link>}
            />
        );
    }

    const pickFile = (f) => {
        if (!f) return;
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const validDetails = () => {
        if (!name.trim()) {
            toast.error("Give the product a name");
            return false;
        }
        if (!cat) {
            toast.error("Pick a category");
            return false;
        }
        const p = Number(price);
        const o = Number(offer);
        if (!price || isNaN(p) || p <= 0) {
            toast.error("Enter a valid price");
            return false;
        }
        if (offer === "" || isNaN(o) || o <= 0 || o > p) {
            toast.error("Offer price must be between 1 and the MRP");
            return false;
        }
        return true;
    };

    const publish = async () => {
        if (!file) {
            toast.error("Add a product photo first");
            setStep(2);
            return;
        }
        setPublishing(true);
        try {
            await uploadProductImage(file);
            await saveProduct({
                pid,
                pname: name.trim(),
                pprice: Number(price),
                oprice: Number(offer),
                ppicname: file.name,
                pcatgid: Number(cat),
                vid: Number(vid),
                status,
            });
            setDone(true);
            toast.success("Product published!");
        } catch (e) {
            toast.error(e.message || "Publish failed — try again");
        } finally {
            setPublishing(false);
        }
    };

    const reset = () => {
        setStep(1);
        setDone(false);
        setName("");
        setPrice("");
        setOffer("");
        setStatus("Active");
        setFile(null);
        setPreview("");
        nextProductId().then(setPid).catch(() => {});
    };

    if (done) {
        return (
            <div ref={ref} className="mx-auto max-w-lg text-center">
                <Card className="wz-anim p-10">
                    <p className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">✓</p>
                    <h2 className="mt-4 font-display text-2xl font-extrabold">Product is live!</h2>
                    <p className="mt-2 text-sm text-ink-600">“{name}” is now on the shelf{status === "Active" ? "" : " (inactive — flip it live from My Products)"}.</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Button onClick={reset}>Add another</Button>
                        <Link to="/modern/shop"><Button variant="ghost">View shop</Button></Link>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div ref={ref} className="mx-auto max-w-2xl">
            <Stepper step={step} />
            {step === 1 && (
                <Card className="wz-anim flex flex-col gap-4 p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-xl font-extrabold">Product details</h2>
                        {pid && <Badge tone="slate">ID #{pid}</Badge>}
                    </div>
                    <Input label="Product name" placeholder="e.g. Boult Headphones" value={name} onChange={(e) => setName(e.target.value)} />
                    <label className="block">
                        <span className="mb-1.5 block font-display text-sm font-semibold text-ink-900">Category</span>
                        <select value={cat} onChange={(e) => setCat(e.target.value)} className="w-full rounded-xl border-0 bg-slate-100 px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-brand-500">
                            {cats.map((c) => <option key={c.PCatgId} value={c.PCatgId}>{c.PCatgName}</option>)}
                        </select>
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Input label="MRP (₹)" type="number" min="1" placeholder="1200" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <Input label="Offer price (₹)" type="number" min="1" placeholder="999" value={offer} onChange={(e) => setOffer(e.target.value)} />
                    </div>
                    <label className="block">
                        <span className="mb-1.5 block font-display text-sm font-semibold text-ink-900">Launch as</span>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-xl border-0 bg-slate-100 px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-brand-500">
                            <option value="Active">Active (visible now)</option>
                            <option value="Inactive">Inactive (hidden)</option>
                        </select>
                    </label>
                    <div className="flex justify-end">
                        <Button onClick={() => validDetails() && setStep(2)}>Continue →</Button>
                    </div>
                </Card>
            )}
            {step === 2 && (
                <Card className="wz-anim flex flex-col gap-4 p-6 sm:p-8">
                    <h2 className="font-display text-xl font-extrabold">Product photo</h2>
                    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition hover:border-brand-500 hover:bg-brand-50">
                        <span className="text-4xl">📸</span>
                        <span className="font-display text-sm font-bold">{file ? file.name : "Click to choose a photo"}</span>
                        <span className="text-xs text-ink-600">JPG / PNG / WebP — shown exactly as shoppers see it</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => pickFile(e.target.files[0])} />
                    </label>
                    {preview && <img src={preview} alt="preview" className="mx-auto max-h-72 rounded-xl object-contain ring-1 ring-slate-100" />}
                    <div className="flex justify-between">
                        <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
                        <Button onClick={() => (file ? setStep(3) : toast.error("Choose a photo first"))}>Review →</Button>
                    </div>
                </Card>
            )}
            {step === 3 && (
                <Card className="wz-anim flex flex-col gap-4 p-6 sm:p-8">
                    <h2 className="font-display text-xl font-extrabold">Review & publish</h2>
                    <div className="flex gap-4">
                        {preview && <img src={preview} alt="preview" className="h-28 w-28 rounded-xl object-contain ring-1 ring-slate-100" />}
                        <dl className="flex-1 space-y-1.5 text-sm">
                            <div className="flex justify-between"><dt className="text-ink-600">Name</dt><dd className="font-bold">{name}</dd></div>
                            <div className="flex justify-between"><dt className="text-ink-600">Category</dt><dd className="font-bold">{cats.find((c) => String(c.PCatgId) === String(cat))?.PCatgName}</dd></div>
                            <div className="flex justify-between"><dt className="text-ink-600">Price</dt><dd className="font-bold">₹{offer} <span className="font-normal text-ink-600 line-through">₹{price}</span></dd></div>
                            <div className="flex justify-between"><dt className="text-ink-600">Vendor</dt><dd className="font-bold">#{vid}</dd></div>
                            <div className="flex justify-between"><dt className="text-ink-600">Status</dt><dd><Badge tone={status === "Active" ? "green" : "slate"}>{status}</Badge></dd></div>
                        </dl>
                    </div>
                    <div className="flex justify-between">
                        <Button variant="ghost" onClick={() => setStep(2)} disabled={publishing}>← Back</Button>
                        <Button variant="accent" onClick={publish} disabled={publishing}>{publishing ? "Publishing…" : "Publish product"}</Button>
                    </div>
                </Card>
            )}
        </div>
    );
}

export default AddProduct;
