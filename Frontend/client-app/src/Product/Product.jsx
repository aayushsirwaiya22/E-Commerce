import React, { useEffect, useState } from "react";
import axios from "axios";

function Product(props) {
    const [pid, setPId] = useState();
    const [pname, setPName] = useState();
    const [pprice, setPPrice] = useState();
    const [oprice, setOPrice] = useState();
    const [ppicname, setPPicName] = useState();
    const [pcatgid, setPCatgId] = useState();
    const [pcatglist, setPCatgList] = useState([]);
    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');
    const [plist, setPList] = useState([]);
    var cname = "";
    var catgname = "";

    var vendorid = props.data == undefined ? 0 : props.data;

    const handlePidText = (evt) => {
        setPId(evt.target.value);
    }
    const handlePNameText = (evt) => {
        setPName(evt.target.value);
    }
    const handlePPriceText = (evt) => {
        setPPrice(evt.target.value);
    }
    const handleOPriceText = (evt) => {
        setOPrice(evt.target.value);
    }
    const handlePCatgSelect = (evt) => {
        setPCatgId(evt.target.value);
    }
    useEffect(() => {
        // alert("VID= " + venderid)
        axios.get("http://localhost:9669/product/getmaxpid").then((res) => {
            setPId(res.data.length + 1);
        }).catch((err) => {
            alert(err);
        })
        axios.get("http://localhost:9669/productcatg/show").then((res) => {
            setPCatgList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }, []);

    const handleSaveButton = () => {

        var obj = {
            pid: pid,
            pname: pname,
            pprice: pprice,
            oprice: oprice,
            ppicname: ppicname,
            pcatgid: pcatgid,
            vid: vendorid,
            status: "Active"
        };
        axios.post("http://localhost:9669/product/saveproduct/", obj)
            .then((res) => {
                alert("Product Saved");
            })
            .catch((err) => {
                alert(err);
            })
    }

    const handleShowButton = () => {
        axios.get("http://localhost:9669/product/showproductbyvendor/" + vendorid)
            .then((res) => {
                setPList(res.data);
            })
            .catch((err) => {
                alert(err);
            })
    }

    //browse and save image code

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data);
        const response = await fetch('http://localhost:9669/product/saveproductimage', {
            method: 'POST',
            body: formData,
        })
        if (response) {
            if (response.statusText == "ok") {
                setStatus("File uploaded successfully");
            }
            else {
                setStatus("Failed to uploaf File");
            }
        }
    }

    const handleFileChange = (evt) => {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        }
        setImage(img)
        setPPicName(evt.target.files[0].name);
    }

    const handleNewButton = () => {
        axios.get("http://localhost:9669/product/getmaxpid")
            .then((res) => {
                setPId(res.data.length + 1);
                setPName("");
                setPCatgId("");
                setPPrice("");
                setOPrice("");
                setPPicName("");
                setImage({ preview: '', data: '' });

            })
            .catch((err) => {
                alert(err);
            });
    }
    return (
        <>
            <div style={{ background: "aqua", color: "red" }}>
                <center>
                    <p>Vendor Id {vendorid}</p>
                    <p>Product Form</p>
                    <table border={1}>
                        <tr>
                            <td>Product Id</td>
                            <td>{pid}</td>
                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>
                                <input type="text " onChange={handlePNameText} value={pname} />
                            </td>
                        </tr>
                        <tr>
                            <td>Product Price</td>
                            <td>
                                <input type="number " onChange={handlePPriceText} value={pprice} />
                            </td>
                        </tr>
                        <tr>
                            <td>offer Price</td>
                            <td>
                                <input type="number " onChange={handleOPriceText} value={oprice} />
                            </td>
                        </tr>
                        <tr>
                            <td>Select Photo</td>
                            <td>
                                <input type="file" onChange={handleFileChange} name="file" />
                                <img src={image.preview} width="100" height="100" />
                            </td>
                        </tr>
                        <tr>
                            <td>Click to upload Product Photo</td>
                            <td>
                                <button type="submit " onClick={handleSubmit}>Upload</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>
                                <select onChange={handlePCatgSelect}>
                                    {
                                        pcatglist.map((pcatgitem) => (
                                            <option value={pcatgitem.PCatgId}>{pcatgitem.PCatgName}</option>
                                        ))
                                    }

                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleNewButton}>New</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleSaveButton}>Save</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleShowButton}>Show</button>
                            </td>
                        </tr>
                    </table>
                </center>
            </div>
            <center>
                <p style={{ backgroundColor: "green", color: "white" }}>Product List</p>
                <div className="jubotron" style={{ marginLeft: 20, marginRight: 20, borderRadius: 5 }}>
                    <table border={1}>
                        <tr>
                            <th>SNO</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Offer Price</th>
                            <th>Category name</th>
                            <th>Photo</th>
                        </tr>
                        {
                        plist.map((item) => (
                            <tr>
                                <td>{item.pid}</td>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.pprice}</td>
                                <td>{item.oprice}</td>
                                <td>
                                    {
                                        pcatglist.map((citem) => {
                                            if (item.pcatgid == citem.PCatgId) {
                                                cname = (citem.PCatgName);
                                            }
                                        })
                                    }
                                    {cname}
                                </td>
                                <td>
                                    <img src={"http://localhost:9669/product/getproductimage/" + item.ppicname} height={100} width={100} />
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </center>
        </>

    )
} export default Product;