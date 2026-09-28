import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ModernShell } from "./layout";
import PlaceholderHome from "./pages/PlaceholderHome";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import VendorStudio from "./vendor/VendorStudio";
import AdminConsole from "./admin/AdminConsole";

// New experience lives under /modern/* — legacy pages untouched.
function ModernApp() {
    return (
        <ModernShell>
            <Toaster position="top-center" toastOptions={{ duration: 3200 }} />
            <Routes>
                <Route path="/" element={<PlaceholderHome />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:pid" element={<ProductDetail />} />
                <Route path="/vendor/*" element={<VendorStudio />} />
                <Route path="/admin/*" element={<AdminConsole />} />
                <Route path="*" element={<PlaceholderHome />} />
            </Routes>
        </ModernShell>
    );
}

export default ModernApp;
