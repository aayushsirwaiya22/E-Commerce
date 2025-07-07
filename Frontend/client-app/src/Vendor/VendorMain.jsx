import React from "react";
import { Link, Outlet } from "react-router-dom";

function VendorMain() {
    return (
        <div className="vendor-main-container">
            <header className="vendor-main-header">
                <h2>Welcome to Vendor Portal</h2>
                <nav className="vendor-main-nav">
                    <Link to="vendorlogin" className="vendor-nav-link">Login</Link>
                    <Link to="vendorreg" className="vendor-nav-link">Registration</Link>
                </nav>
            </header>
            <main className="vendor-main-outlet">
                <Outlet />
            </main>
        </div>
    );
}

export default VendorMain;
