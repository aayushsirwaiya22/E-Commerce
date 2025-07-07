import React, { useEffect, useState } from "react";
import axios from "axios";
import VendorReg from "./VendorReg"
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import VendorHome from "./VendorHome";

function VendorLogin() {

    const [uid, setUId] = useState("");
    const [upass, setUPass] = useState("");
    const [ischecked, setIsChecked] = useState("");

    const handleUIdText = (evt) => {
        setUId(evt.target.value);
    }

    const handleUPassText = (evt) => {
        setUPass(evt.target.value);
    }

    useEffect(() => {
        var mycookies = Cookies.get('vauth');
        if (mycookies !== undefined) {
            var obj = JSON.parse(mycookies);
            //alert(obj.username);
            setUId(obj.username);
            setUPass(obj.password);
        }
    }, [])

    const handleLoginButton = () => {
        var obj = {
            vuid: uid,
            vupass: upass
        };
        axios.post("http://localhost:9669/vendor/login", obj).then((res) => {
          
            if (res.data.VUserId != undefined) {
                if (res.data.Status == "Inactive") {
                    alert("User Not Active Please Wait For Admin Activation Process");
                    return;
                }
                //cookies handling code
                if (ischecked == true) {
                    const userData = {
                        username: uid,
                        password: upass
                    };
                    const expirationTime = new Date
                        (new Date().getTime() + 6000000);
                    //store data in cookies
                    Cookies.set('vauth', JSON.stringify
                        (userData), { expires: expirationTime });
                }

                //session handling code
                const userSessionData = {
                    vuserfullname: res.data.VendorName
                };
                const sessionexpirationTime = new Date(new Date().getTime() + 60000);

                //store data in session

                sessionStorage.setItem("vsessionauth", JSON.stringify(userSessionData), sessionexpirationTime);

                const root = ReactDOM.createRoot(document.getElementById("root"));
                var obj = {
                    vfname: res.data.VendorName,
                    vpicname: res.data.VPicName,
                    vid: res.data.Vid
                }
                alert("Vender Id " + obj.vid)
                root.render(<VendorHome data={obj}></VendorHome>)
            }
            else {
                alert("Invalid Id/Password");
            }
        });
    }
    const handleIsRemember = () => {
        setIsChecked(true);
    }

    const handleRegister = () => {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<VendorReg />)
    }

    return (
        <div>
            <center>
                <h4>Vendor Login Form</h4>
                <div>
                    <table border={2}>
                        <tr>
                            <td>User Id</td>
                            <td>
                                <input type="text" onChange={handleUIdText} value={uid} />
                            </td>
                        </tr>

                        <tr>
                            <td>Password</td>
                            <td>
                                <input type="password" onChange={handleUPassText} value={upass} />
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <input type="checkbox" onClick={handleIsRemember} /><span>Remember Me</span>
                            </td>
                        </tr>

                        <tr>
                            <td><button type="submit" onClick={handleLoginButton}>Login</button></td>
                            <td>
                                <button type="submit" onClick={handleRegister}>
                                    Register
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </div>
    )

}
export default VendorLogin;
