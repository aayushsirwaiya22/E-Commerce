import React, { useState } from "react";
import StateMgt from "./StateMgt";
import City from "./City";
import ProductCatg from "./Productcatg";
import VendorMgt from "./VendorMgt";
import ShowBills from "./ShowBills";
import ReactDOM from "react-dom/client";
import ProductList from "./ProductList";
import CustomerMgt from "./CustomerMgt";
import MainPage from "../MainPage";


function AdminHome() {
    const [isstateshow, setIsStateShow] = useState(false);
    const [iscityshow, setIsCityShow] = useState(false);
    const [ispcatgshow, setIsPCatgShow] = useState(false);
    const [isvendershow, setIsVenderShow] = useState(false);
    const [isbillshow, setIsBillShow] = useState(false);
    const [isproductlistshow, setIsProductListShow] = useState(false);
    const [iscustomershow, setIsCustomerShow] = useState(false);

    function togleState() {
        setIsStateShow((isstateshow) => !isstateshow);
    }

    function togleCity() {
        setIsCityShow((iscityshow) => !iscityshow);
    }

    function togleProductCatg() {
        setIsPCatgShow((ispcatgshow) => !ispcatgshow);
    }

    function togleVender() {
        setIsVenderShow((isvendershow) => !isvendershow);
    }

    function togleBill() {
        setIsBillShow((isbillshow) => !isbillshow);
    }

    function togleProductList() {
        setIsProductListShow((isproductlistshow) => !isproductlistshow);
    }

    function togleCustomerList() {
        setIsCustomerShow((iscustomershow) => !iscustomershow);
    }

    function LogOutButtonClick() {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<MainPage />);
    }

    return (
        <div className="admin-home-container fade-in">
            <center>
                <h4 className="section-heading slide-down">Welcome to Admin dashboard</h4>
                <div className="admin-button-group bounce-in">
                    <button className="btn-animate" type="submit" onClick={togleState}>State</button>
                    <button className="btn-animate" type="submit" onClick={togleCity}>City</button>
                    <button className="btn-animate" type="submit" onClick={togleProductCatg}>Product Category</button>
                    <button className="btn-animate" type="submit" onClick={togleVender}>Vender</button>
                    <button className="btn-animate" type="submit" onClick={togleBill}>Bills</button>
                    <button className="btn-animate" type="submit" onClick={togleProductList}>Product</button>
                    <button className="btn-animate" type="submit" onClick={togleCustomerList}>Customer</button>
                    <button className="btn-animate logout-btn" type="submit" onClick={LogOutButtonClick}>Logout</button>
                </div>

                <div className="admin-module-container fade-in">
                    {isstateshow && <StateMgt />}
                    {iscityshow && <City />}
                    {ispcatgshow && <ProductCatg />}
                    {isvendershow && <VendorMgt />}
                    {isbillshow && <ShowBills />}
                    {isproductlistshow && <ProductList />}
                    {iscustomershow && <CustomerMgt />}
                </div>
            </center>
        </div>
    );
}

export default AdminHome;
