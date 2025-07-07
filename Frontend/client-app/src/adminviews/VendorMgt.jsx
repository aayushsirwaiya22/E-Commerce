import React, { useState, useEffect } from "react";
import axios from "axios";

function VendorMgt() {
    const [vendorlist, setVendorList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9669/vendor/getvendorcount")
            .then((res) => {
                setVendorList(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const handleActiveButton = (vid) => {
        var newstatus = "Active";
        axios.put("http://localhost:9669/vendor/vendormanage/" + vid + "/" + newstatus)
            .then((res) => {
                alert(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleInActiveButton = (vid) => {
        var newstatus = "Inactive";
        axios.put("http://localhost:9669/vendor/vendormanage/" + vid + "/" + newstatus)
            .then((res) => {
                alert(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="panel-container">
            <center>
                <h4 className="panel-header">Vendor List</h4>
                <table border={1} className="table table-bordered">
                    <thead>
                        <tr className="table-header">
                            <th>Vid</th>
                            <th>Vendor Name</th>
                            <th>Status</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vendorlist.map((item) => (
                                <tr key={item.Vid}>
                                    <td>{item.Vid}</td>
                                    <td>{item.VendorName}</td>
                                    <td className={item.Status === "Active" ? "status-enabled" : "status-disabled"}>
                                        {item.Status}
                                    </td>
                                    <td>
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            onClick={() => handleActiveButton(item.Vid)}
                                        >
                                            Active
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            onClick={() => handleInActiveButton(item.Vid)}
                                        >
                                            Inactive
                                        </button>
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

export default VendorMgt;
