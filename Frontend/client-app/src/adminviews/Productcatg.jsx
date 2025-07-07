import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductCatg() {
    const [pcatgid, setPcatgId] = useState();
    const [pcatgname, setPcatgName] = useState();
    const [pcatglist, setPctagList] = useState([]);

    const handlePcatgName = (evt) => {
        setPcatgName(evt.target.value);
    };

    useEffect(() => {
        axios.get("http://localhost:9669/productcatg/show").then((res) => {
            setPcatgId(res.data.length + 1); // auto-set category id
        }).catch((err) => {
            alert(err);
        });
    }, []);

    const handleSaveButton = () => {
        var obj = {
            PCatgId: pcatgid,
            PCatgName: pcatgname
        };
        axios.post("http://localhost:9669/productcatg/save", obj).then((res) => {
            alert(res);
        }).catch((err) => {
            alert(err);
        });
    };

    const handleShowButton = () => {
        axios.get("http://localhost:9669/productcatg/show").then((res) => {
            setPctagList(res.data);
        }).catch((err) => {
            alert(err);
        });
    };

    return (
        <div className="panel-container">
            <center>
                <h4 className="panel-header bg-success">Manage Product Category</h4>

                <table className="table">
                    <tbody>
                        <tr>
                            <td>Product Category ID</td>
                            <td>{pcatgid}</td>
                        </tr>
                        <tr>
                            <td>Product Category Name</td>
                            <td>
                                <input type="text" className="form-control" onChange={handlePcatgName} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn-submit" onClick={handleSaveButton}>Submit</button>
                            </td>
                            <td>
                                <button className="btn-show" onClick={handleShowButton}>Show</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h3>Product Category List</h3>

                <table className="table table-bordered">
                    <thead className="table-header">
                        <tr>
                            <th>Category ID</th>
                            <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pcatglist.map((item, index) => (
                            <tr key={index}>
                                <td>{item.PCatgId}</td>
                                <td>{item.PCatgName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default ProductCatg;
