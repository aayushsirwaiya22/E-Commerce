import React from "react";
import { Link, Outlet } from "react-router-dom";

function CustomerMain() {
    return (
        <div className="customer-main-container">
            <header className="customer-main-header">
                <h2>Welcome to Customer Portal</h2>
                <nav className="customer-main-nav">
                    <Link to="customerlogin" className="customer-nav-link">Login</Link>
                    <Link to="customerreg" className="customer-nav-link">Registration</Link>
                </nav>
            </header>
            <main className="customer-main-outlet">
                <Outlet />
            </main>
        </div>
    )
}

export default CustomerMain;
