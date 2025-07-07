import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerReg(props) {
    const [cuserid, setCUserId] = useState();
    const [cuserpass, setCUserPass] = useState();
    const [customername, setCustomerName] = useState();
    const [stid, setStId] = useState();
    const [ctid, setCtId] = useState();
    const [caddress, setCAddress] = useState();
    const [ccontact, setCContact] = useState();
    const [cemail, setCEmail] = useState();
    const [cpicname, setCPicName] = useState();
    const [cid, setCId] = useState();
    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState();
    const [stlist, setStList] = useState([]);
    const [ctlist, setCtList] = useState([]);

    const handleCUserIdText = (evt) => {
        setCUserId(evt.target.value);
    }
    const handleCUserPass = (evt) => {
        setCUserPass(evt.target.value);
    }
    const handleCustomerNameText = (evt) => {
        setCustomerName(evt.target.value);
    }

    const handleStIdSelect = (evt) => {
        setStId(evt.target.value);
        axios.get("http://localhost:9669/city/showallcitybystate/" + evt.target.value)
            .then((res) => {
                setCtList(res.data);
            })
            .catch((err) => {
                alert(err+"city")
            })
    }

    const handleCtIdSelect = (evt) => {
        setCId(evt.target.value);
    }

    const handleCAddressText = (evt) => {
        setCAddress(evt.target.value)
    }
    const handleCContactText = (evt) => {
        setCContact(evt.target.value);
    }
    const handleCEmailText = (evt) => {
        setCEmail(evt.target.value);
    }
    const handleCidText = (evt) => {
        setCId(evt.target.value);
    }
    useEffect(() => {
        axios.get("http://localhost:9669/customer/getcustomercount")
            .then((res) => {
                setCId(res.data.length + 1);
            })
            .catch((err) => {
                alert(err);
            })
        axios.get("http://localhost:9669/State/show/")
            .then((res) => {
                setStList(res.data);
            })
            .catch((err) => {
                alert(err+"state error");
            })
    }, []);

    const handleRegisterButton = async () => {
        var obj = {
            CUserId: cuserid,
            CUserPass: cuserpass,
            CustomerName: customername,
            StId: stid,
            CtId: ctid,
            CAddress: caddress,
            CContact: ccontact,
            CEmail:cemail,
            CPicName: cpicname,
            Cid: cid,
            Status: "Inactive"
        }
        let formData = new FormData()
        formData.append('file', image.data);
        const response = await fetch
            ("http://localhost:9669/customer/savecustomerimage", {
                method: 'POST',
                body: formData,
            })
        if (response) {
            if (response.statustext == 'ok') {
                setStatus("file uploaded successfully");
            }
            else {
                setStatus("Failed to upload file")
            }
        }

        axios.post("http://localhost:9669/customer/register/", obj)
            .then((res) => {
                alert(res.data);
                if (res.data == "Registration Successfull") {
                    axios.post("http://localhost:9669/email/sendemails/" + cemail)
                        .then((res) => {
                            alert(res.data);
                        })
                        .catch((err) => {
                            alert(err)
                        })
                }
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
        const response = await fetch("http://localhost:9669/customer/savecustomerimage", {
            method: 'POST',
            body: formData,
        })
        if (response) {
            if (response.statustext == 'ok') {
                setStatus("file uploaded successfully");
            }
            else {
                setStatus("Failed to upload file");
            }
        }

    }
    const handleFileChange = (evt) => {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        }
        setImage(img)
        setCPicName(evt.target.files[0].name);
    }

    return (
        <div>
            <center>
                <p>Customer Register</p>
                <table>
                    <tr>
                        <td>Customer Id</td>
                        <td>{cid}</td>
                    </tr>
                    <tr>
                        <td>User Id</td>
                        <td><input type="text" onChange={handleCUserIdText} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" onChange={handleCUserPass} />
                        </td>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <td>
                            <input type="text" onChange={handleCustomerNameText} />
                        </td>
                    </tr>
                    <tr>
                        <td>state</td>
                        <td>
                            <select onClick={handleStIdSelect}>
                                {
                                    stlist.map((items) => (
                                        <option value={items.StId}>{items.StName}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" onChange={handleCAddressText} />
                        </td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td>
                            <input type="number" onChange={handleCContactText} />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="email" onChange={handleCEmailText} />
                        </td>
                    </tr>
                    <tr>
                        <td>city</td>
                        <td>
                            <select onClick={handleCtIdSelect}>
                                {
                                    ctlist.map((items) => (
                                        <option value={items.ctid}>{items.ctname}</option>
                                    ))
                                    }
                                
                            </select>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Select Photo</td>
                        <input type="file" onChange={handleFileChange} name="file"/>
                        <img src={image.preview} width={100} height={100}/>

                    </tr>
                    <tr>
                        <td>Click to upload to customer photo</td>
                        <td>
                            <button type="submit" onClick={handleSubmit}>Upload</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" onClick={handleRegisterButton}>Register</button>
                        </td>
                    </tr>
                </table>
            </center>
        </div>
    )
} export default CustomerReg;