import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ModernShell } from "./layout";
import PlaceholderHome from "./pages/PlaceholderHome";

// New experience lives under /modern/* — legacy pages untouched.
function ModernApp() {
    return (
        <ModernShell>
            <Toaster position="top-center" toastOptions={{ duration: 3200 }} />
            <Routes>
                <Route path="/" element={<PlaceholderHome />} />
                <Route path="*" element={<PlaceholderHome />} />
            </Routes>
        </ModernShell>
    );
}

export default ModernApp;
