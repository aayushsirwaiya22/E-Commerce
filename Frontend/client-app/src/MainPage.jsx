import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AdminMain from "./adminviews/AdminMain";
import AdminLogin from "./adminviews/AdminLogin";
import AdminReg from "./adminviews/AdminReg";
import AdminHome from "./adminviews/AdminHome";

import CustomerMain from "./Customer/CustomerMain";
import CustomerLogin from "./Customer/CustomerLogin";
import CustomerReg from "./Customer/CustomerReg";

import VendorMain from "./Vendor/VendorMain";
import VendorLogin from "./Vendor/VendorLogin";
import VendorReg from "./Vendor/VendorReg";

function MainPage() {
    return (
        <Router>
            <div className="main-container">
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/adminmain">Admin</Link></li>
                        <li><Link to="/customermain">Customer</Link></li>
                        <li><Link to="/vendormain">Vendor</Link></li>
                    </ul>
                </nav>

                <Routes>
                    {/* Admin Routes */}
                    <Route path="/adminmain" element={<AdminMain />}>
                        <Route path="adminlogin" element={<AdminLogin />} />
                        <Route path="adminreg" element={<AdminReg />} />
                        <Route path="adminhome" element={<AdminHome />} />
                    </Route>

                    {/* Customer Routes */}
                    <Route path="/customermain" element={<CustomerMain />}>
                        <Route path="customerlogin" element={<CustomerLogin />} />
                        <Route path="customerreg" element={<CustomerReg />} />
                    </Route>

                    {/* Vendor Routes */}
                    <Route path="/vendormain" element={<VendorMain />}>
                        <Route path="vendorlogin" element={<VendorLogin />} />
                        <Route path="vendorreg" element={<VendorReg />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default MainPage;
