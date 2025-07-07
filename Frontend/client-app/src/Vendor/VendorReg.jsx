import React, { useEffect, useState } from "react";
import axios from "axios";
import VendorLogin from "./VendorLogin"
import ReactDOM from "react-dom/client"

function VendorReg() {
    const [vuserid, setVUserId] = useState();
    const [vuserpass, setVUserPass] = useState();
    const [vendorname, setVendorName] = useState();
    const [vaddress, setVAddress] = useState();
    const [vemail, setVEmail] = useState();
    const [vcontact, setVContact] = useState();
    const [vpicname, setVPicName] = useState();
    const [vid, setVId] = useState();
    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState();

    const handleVUserIdText = (evt) => {
        setVUserId(evt.target.value);
    }
    const handleVUserPass = (evt) => {
        setVUserPass(evt.target.value);
    }
    const handleVendorName = (evt) => {
        setVendorName(evt.target.value);
    }
    const handleVAddressText = (evt) => {
        setVAddress(evt.target.value);
    }
    const handleVContactText = (evt) => {
        setVContact(evt.target.value);
    }
    const handleVEmailText = (evt) => {
        setVEmail(evt.target.value);
    }
    const handleVidText = (evt) => {
        setVId(evt.target.value);
    }

    useEffect(() => {
        axios.get("http://localhost:9669/vendor/getvendorcount/")
            .then((res) => {
                setVId(res.data.length + 1);
            })
            .catch((err) => {
                alert(err);
            })
    },[]);
    const handleRegistrationButton = () => {
        var obj = {
            VUserId: vuserid,
            VUserPass: vuserpass,
            VendorName: vendorname,
            VAddress: vaddress,
            Vcontact: vcontact,
            VEmail: vemail,
            VPicName:vpicname,
            Vid: vid,
            Status: "active"
        }
        axios.post("http://localhost:9669/vendor/register/", obj)
            .then((res) => {
                alert(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }
    //browse and save image code
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data);
        const response = await fetch("http://localhost:9669/vendor/savevendorimage", {
            method: 'POST',
            body: formData,
        })
        if (response) {
            if (response.ok) {
                setStatus("File Uploaded Successfully");
            }
            else {
                setStatus("Failed to Upload File")
            }
        }
    }
    const handleFileChange = (evt) => {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        }
        setImage(img)
        setVPicName(evt.target.files[0].name);
    }
    const handleLogin = () => {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<VendorLogin />)
    }
    return (
        <div>
            <center>
                <p style={{ marginLeft: 20, marginLeft: 20, borderRadius: 5 }}></p>
                <table>
                    <tr>
                        <td>Vendor Id</td>
                        <td>{vid}</td>
                    </tr>
                    <tr>
                        <td>User Id</td>
                        <td>
                            <input type="text" onChange={handleVUserIdText}
                                className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>User Password</td>
                        <td>
                            <input type="password" onChange={handleVUserPass}
                                className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>Vendor Name</td>
                        <td>
                            <input type="text" onChange={handleVendorName}
                                className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" onChange={handleVAddressText}
                                className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td>
                            <input type="number" maxLength={10} minLength={10} onChange={handleVContactText}
                                className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="email" onChange={handleVEmailText}
                                className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td> Select Photo</td>
                        <td>
                            <input type="file" onChange={handleFileChange} name="file" />
                            <img src={image.preview} width="100" height={100}/>
                        </td>
                    </tr>
                    <tr>
                        <td> Click to upload vendor photo</td>
                        <td>
                            <button type="submit" onClick={handleSubmit} className="btn btn-danger">upload</button>
                        </td>
                    </tr>

                    <tr>
                        <td> 
                            <button type="submit" onClick={handleRegistrationButton}>Register</button>
                        </td>
                        <td>
                            <button type="submit" onClick={handleLogin} className="btn btn-success">Login</button>
                        </td>
                    </tr>

                </table>
            </center>
        </div>
    )
} export default VendorReg;