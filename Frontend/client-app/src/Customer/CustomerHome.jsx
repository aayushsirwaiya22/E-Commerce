import React, { useEffect, useState } from "react";
import ProductList from "../Product/ProductList";
import BillByID from "../Bill/BillByID";
import ReactDOM from "react-dom/client";
import CustomerLogin from "./CustomerLogin";
import "../App.css"; // Assuming shared CSS file

function CustomerHome(props) {
    const [custname, setCustName] = useState();
    const [isshowplist, setIsShowPlist] = useState(false);
    const [isshowbill, setIsShowBill] = useState(false);

    useEffect(() => {
        var obj = JSON.parse(sessionStorage.getItem("sessionauth"));
        if (obj !== undefined && obj !== null) {
            setCustName(obj.userfullname);
        } else {
            alert("Session expired");
        }
    }, []);

    const handleLogOut = () => {
        sessionStorage.removeItem("sessionauth");
        alert("Customer session closed");
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<CustomerLogin />);
    };

    const togleShoping = () => {
        setIsShowPlist(!isshowplist);
    };

    const togleBill = () => {
        setIsShowBill(!isshowbill);
    };

    return (
        <div className="customer-home-container">
            <div className="customer-header">
                <p>Session Active: <strong>{custname}</strong></p>
                <h4>Customer Home Page</h4>
                <h5>Welcome, {props.data.cfname}</h5>
                <img
                    className="customer-img"
                    src={"http://localhost:9669/customer/getimage/" + props.data.cpicname}
                    height={100}
                    width={100}
                    alt="Customer"
                />
                <div className="customer-buttons">
                    <button onClick={togleShoping} className="btn-primary">Shopping</button>
                    <button onClick={togleBill} className="btn-primary">Show Bills</button>
                    <button onClick={handleLogOut} className="btn-secondary">Log Out</button>
                </div>
            </div>

            {isshowplist && <ProductList data={props.data.cid} />}
            {isshowbill && <BillByID data={props.data.cid} />}

            <footer className="customer-footer">
                <marquee>www.google.com</marquee>
            </footer>
        </div>
    );
}

export default CustomerHome;
