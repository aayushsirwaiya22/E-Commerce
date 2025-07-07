import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import Bill from "../Bill/Bill";
import "../App.css"; // Make sure to import your css

function ProductList(props) {
    const [itemcount, setItemCount] = useState(0);
    const [selitems, setSelItems] = useState([]);
    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);
    const [vlist, setVList] = useState([]);

    var cname = "";

    useEffect(() => {
        axios.get("http://localhost:9669/product/showproduct").then((res) => {
            setPList(res.data);
        }).catch((err) => alert(err));

        axios.get("http://localhost:9669/productcatg/show").then((res) => {
            setPCatgList(res.data);
        }).catch((err) => alert(err));

        axios.get("http://localhost:9669/vendor/getvendorcount").then((res) => {
            setVList(res.data);
        }).catch((err) => alert(err));
    }, []);

    const handleBuyButton = (evt) => {
        var pid = parseInt(evt);
        axios.get("http://localhost:9669/product/showproductstatus/" + pid).then((res) => {
            if (res.data.status === "Active") {
                setItemCount(itemcount + 1);
                plist.map((item) => {
                    if (item.pid === pid) selitems.push(item);
                });
            } else {
                alert("Product Out of Stock");
            }
        }).catch((err) => alert(err));
    };

    const handleActiveButton = (pid) => {
        axios.put("http://localhost:9669/product/updateproductstatus/" + pid + "/Active")
            .then(() => alert("Product Status Updated")).catch((err) => alert(err));
    };

    const handleInActiveButton = (pid) => {
        axios.put("http://localhost:9669/product/updateproductstatus/" + pid + "/Inactive")
            .then(() => alert("Product Status Updated")).catch((err) => alert(err));
    };

    const handleCheckButton = () => {
        if (selitems.length <= 0) {
            alert("Please Buy Some Product");
        } else {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            var ccid = props.data;
            var obj = {
                selitems: selitems,
                cid: ccid
            };
            root.render(<Bill data={obj}></Bill>);
        }
    };

    const handleSearch = (evt) => {
        const id = evt.target.value;
        const url = id > 0
            ? "http://localhost:9669/product/showproductbycatgid/" + id
            : "http://localhost:9669/product/showproduct";
        axios.get(url).then((res) => {
            setPList(res.data);
        }).catch((err) => alert(err));
    };

    const handleSearchByVender = (evt) => {
        const id = evt.target.value;
        const url = id > 0
            ? "http://localhost:9669/product/showproductbyvendor/" + id
            : "http://localhost:9669/product/showproduct";
        axios.get(url).then((res) => {
            setPList(res.data);
        }).catch((err) => alert(err));
    };

    return (
        <div className="productlist-container">
            <center>
                <h2>Customer Id: {props.data}</h2>

                <div className="cart-summary">
                    <span className="cart-count">{itemcount} 🛒</span>
                    <button className="btn checkout-btn" onClick={handleCheckButton}>CheckOut</button>
                </div>

                <div className="filter-section">
                    <label>Search by Category</label>
                    <select onChange={handleSearch}>
                        <option value="0">All</option>
                        {pcatglist.map((pcatgitem) => (
                            <option  value={pcatgitem.PCatgId}>
                                {pcatgitem.PCatgName}
                            </option>
                        ))}
                    </select>

                    <label>Search by Vendor</label>
                    <select onChange={handleSearchByVender}>
                        <option value="0">All</option>
                        {vlist.map((vitem) => (
                            <option  value={vitem.vid}>{vitem.VendorName}</option>
                        ))}
                    </select>
                </div>

                <h3>Product List</h3>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Offer Price</th>
                            <th>Category</th>
                            <th>Photo</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plist.map((item) => (
                            <tr key={item.pid}>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.pprice}</td>
                                <td>{item.oprice}</td>
                                <td>
                                    {
                                        pcatglist.map((citem) => {
                                            if (item.pcatgid == citem.PCatgId) {
                                                cname = (citem.PCatgName)
                                            }
                                        })
                                    }
                                    {cname}
                                </td>
                                <td>
                                    <img src={"http://localhost:9669/product/getproductimage/" + item.ppicname} height="100" width="100" />
                                </td>
                                <td>{item.status}</td>
                                <td>
                                    <button className="btn btn-green" onClick={() => handleActiveButton(item.pid)}>Active</button>
                                    <button className="btn btn-red" onClick={() => handleInActiveButton(item.pid)}>Inactive</button>
                                    <button className="btn btn-blue" onClick={() => handleBuyButton(item.pid)}>Buy</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default ProductList;
