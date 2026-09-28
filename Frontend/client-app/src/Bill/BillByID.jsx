import { API_BASE } from "../config";
import React, { useEffect, useState } from 'react';
import axios from "axios";

function BillByID(props) {

    const [billidlist, setBillIdList] = useState([]);
    const [billdetailslist, setBillDetailsList] = useState([]);
    const [plist, setPList] = useState([]);

    var pname = " ";
    var oprice = 0;
    var total = 0;
    var ppicname = "";

    useEffect(() => {
        axios.get(API_BASE + "/bill/billshowbillids/" + props.data).then((res) => {
            setBillIdList(res.data);
        }).catch((err) => {
            alert(err);
        });

        axios.get(API_BASE + "/product/showproduct").then((res) => {
            setPList(res.data);
        }).catch((err) => {
            alert(err);
        });

    }, []);

    const handleBillSelect = (evt) => {
        axios.get(API_BASE + "/bill/showbillbyid/" + evt.target.value).then((res) => {
            setBillDetailsList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }

    return (
        <div className="billbyid-container">
            <center>
                <p className="billbyid-customer-id">Customer Id = {props.data}</p>

                <table className="billbyid-select-table">
                    <tbody>
                        <tr>
                            <td>Bill id</td>
                            <td>
                                <select onClick={handleBillSelect} className="billbyid-select">
                                    {
                                        billidlist.map((item) => (
                                            <option value={item} key={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="billbyid-details-table">
                    <thead>
                        <tr>
                            <th>Bill Id</th>
                            <th>Customer Id</th>
                            <th>Bill date</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Original Price</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            billdetailslist.map((bitem, index) => {
                                plist.forEach((pitem) => {
                                    if (bitem.pid == pitem.pid) {
                                        pname = pitem.pname;
                                        oprice = pitem.oprice;
                                        total += parseInt(pitem.oprice);
                                        ppicname = pitem.ppicname;
                                    }
                                });

                                return (
                                    <tr key={index}>
                                        <td>{bitem.billid}</td>
                                        <td>{bitem.cid}</td>
                                        <td>{bitem.billdate}</td>
                                        <td>{bitem.pid}</td>
                                        <td>{pname}</td>
                                        <td>{oprice}</td>
                                        <td>
                                            <img
                                                src={API_BASE + "/product/getproductimage/" + ppicname}
                                                height="100"
                                                width="100"
                                                className="billbyid-product-image"
                                                alt="product"
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <p className="billbyid-total">Total = {total}</p>
            </center>
        </div>
    );
}

export default BillByID;
