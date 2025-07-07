import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import VendorLogin from "./VendorLogin";
import Product from "../Product/Product"

function VendorHome(props) {
    const [vendname, setVendName] = useState("");

    useEffect(() => {
        var obj = JSON.parse(sessionStorage.getItem('vsessionauth'));
        if (obj !== undefined && obj !== null) {
            //alert(obj.username);
            setVendName(obj.vuserfullname);
        } else {
            alert("Vendor Session Expired");
        }
    }, [])

    const handleAddProductButton = () => {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<Product/>);
    }

    const handleLogOut = () => {
        sessionStorage.removeItem("vsessionauth");
        alert("Vender Session Closed");
        const root = ReactDOM.createRoot(document.getElementById("root"));

        root.render(<VendorLogin />);
    }

    return (
        <div>
            <center>
                <p>Current Session Running For {vendname}</p>
                <h4>Vendor Home Page</h4>
                <h5>Vendor Id{props.data.vid}</h5>
                <h5>Welome{props.data.vfname}</h5>
                <img src={"http://localhost:9669/vendor/getimage/" + props.data.vpicname } width="100" height="100"/>

                <button onClick={handleAddProductButton}>Manage Product</button>
                <button type="submit" onClick={handleLogOut}>Logout</button>
            </center>

        </div>
    )

}

export default VendorHome;