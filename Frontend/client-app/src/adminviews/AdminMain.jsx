import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminMain() {
    return (
        <div className="admin-container">
            <center>
                <nav className="admin-nav">
                    <h2>Welcome to Admin Panel</h2>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminmain/adminlogin">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminmain/adminreg">Registration</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </center>
        </div>
    );
}

export default AdminMain;
