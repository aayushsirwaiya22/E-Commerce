import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ModernShell } from "./layout";
import PlaceholderHome from "./pages/PlaceholderHome";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";

// New experience lives under /modern/* — legacy pages untouched.
function ModernApp() {
    return (
        <ModernShell>
            <Toaster position="top-center" toastOptions={{ duration: 3200 }} />
            <Routes>
                <Route path="/" element={<PlaceholderHome />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:pid" element={<ProductDetail />} />
                <Route path="*" element={<PlaceholderHome />} />
            </Routes>
        </ModernShell>
    );
}

export default ModernApp;
