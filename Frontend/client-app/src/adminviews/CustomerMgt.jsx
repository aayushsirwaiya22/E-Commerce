import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Assuming you're using this for shared styles

function CustomerMgt() {
    const [customerlist, setCustomerList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9669/customer/getcustomercount")
            .then((res) => setCustomerList(res.data))
            .catch((err) => alert(err));
    }, []);

    const handleActiveButton = (cid) => {
        var email = "";
        axios.get("http://localhost:9669/customer/getcustomerdetails/" + cid)
            .then((res) => {
                email = res.data.CEmail;
                alert("customer email" + email);

                var newstatus = "Active";
                axios.put("http://localhost:9669/customer/customermanage/" + cid + "/" + newstatus)
                    .then((res) => {
                        alert(res.data);
                        var mailto = email;
                        var subject = "Login activation";
                        var message = "your id is succesfully activated by admin you can try login";

                        axios.post("http://localhost:9669/emailactivation/sendemails/" + mailto + "/" + subject + "/" + message)
                            .then((res) => alert(res.data))
                            .catch(err => alert(err));
                    }).catch(err => alert(err));
            });
    };

    const handleInActiveButton = (cid) => {
        var email = "";
        axios.get('http://localhost:9669/customer/getcustomerdetails/' + cid)
            .then((res) => {
                email = res.data.CEmail;
                alert("Customer Email" + email);

                var newstatus = "Inactive";
                axios.put("http://localhost:9669/customer/customermanage/" + cid + "/" + newstatus)
                    .then((res) => {
                        alert(res.data);
                        var mailto = email;
                        var subject = "Login deactivation";
                        var message = "your id is successfully inactivated by admin, you cannot login";

                        axios.post("http://localhost:9669/emailactivation/sendemails/" + mailto + "/" + subject + "/" + message)
                            .then((res) => alert(res.data))
                            .catch(err => alert(err));
                    }).catch(err => alert(err));
            });
    };

    return (
        <div className="customer-mgt-wrapper">
            <center>
                <h4 className="title">Customer List</h4>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Customer Id</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerlist.map((item) => (
                                <tr key={item.Cid}>
                                    <td>{item.Cid}</td>
                                    <td>{item.CustomerName}</td>
                                    <td>{item.Status}</td>
                                    <td>
                                        <button className="active-btn" onClick={() => handleActiveButton(item.Cid)}>Active</button>
                                    </td>
                                    <td>
                                        <button className="inactive-btn" onClick={() => handleInActiveButton(item.Cid)}>Inactive</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default CustomerMgt;
