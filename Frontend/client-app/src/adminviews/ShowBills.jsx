import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function ShowBills() {
    const [custlist, setCustList] = useState([]);
    const [billdetailslist, setBillDetailsList] = useState([]);
    const [plist, setPList] = useState([]);
    const [paymentlist, setPaymentList] = useState([]);


    var pname = "";
    var oprice = 0;
    var total = 0;
    var picname = "";
    const [prevbillid, setprevbillid] = useState(0);
    var prbid = 0;
    var k = true;
    var count = 0;

    useEffect(() => {
        axios.get("http://localhost:9669/customer/getcustomerlist").then((res) => {
            setCustList(res.data);
        }).catch((err) => {
            alert("cust list" + err);
        });

        axios.get("http://localhost:9669/product/showproduct").then((res) => {
            setPList(res.data);
        }).catch((err) => {
            alert("show product" + err);
        });

        axios.get("http://localhost:9669/paymentdetails/showpaymentdetails").then((res) => {
            setPaymentList(res.data);
        }).catch((err) => {
            alert("show payment" + err);
        });
    }, [])

    const handleCustomerSelect = (evt) => {
        axios.get("http://localhost:9669/bill/billshow/" + evt.target.value).then((res) => {
            setBillDetailsList(res.data);
            setprevbillid(res.data[0].billid);
            prbid = res.data[0].billid;
            // alert("First Bill Id" + res.data[0].billid + "k=" + k);      
        }).catch((err) => {
            alert("show bill" + err);
        });
    }

    return (
        <>
            <div className="panel-container">
                <center>
                    <p className="panel-header">Bill List - Admin View</p>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Customer</td>
                                <td>
                                    <select onClick={handleCustomerSelect} className="form-control">
                                        {
                                            custlist.map((item) => (
                                                <option key={item.Cid} value={item.Cid}>
                                                    {item.CustomerName + " (" + item.Cid + ")"}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="table table-bordered bill-table">
                        <thead className="table-header">
                            <tr>
                                <th>Bill Id</th>
                                <th>Customer Id</th>
                                <th>Bill Date</th>
                                <th>Product Name</th>
                                <th>Offer Price</th>
                                <th>Product Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                billdetailslist.map((bitem, index) => {
                                    plist.filter((pitem) => {
                                        if (bitem.pid == pitem.pid) {
                                            if (bitem.billid != prbid) {
                                                prbid = bitem.billid;
                                                total = 0;
                                                k = true;
                                            }
                                            if (bitem.billid == prbid) {
                                                k = false;
                                            }
                                            pname = pitem.pname;
                                            oprice = pitem.oprice;
                                            total = total + parseInt(pitem.oprice);
                                            picname = pitem.ppicname;
                                        }
                                    });

                                    return (
                                        <tr key={index}>
                                            <td>{bitem.billid}</td>
                                            <td>{bitem.cid}</td>
                                            <td>{bitem.billdate}</td>
                                            <td>{pname}</td>
                                            <td>{oprice}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:9669/product/getproductimage/${picname}`}
                                                    height={50} width={50}

                                                    alt="Product"
                                                    className="product-image"
                                                />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </center>
            </div>
        </>
    );

}

export default ShowBills;