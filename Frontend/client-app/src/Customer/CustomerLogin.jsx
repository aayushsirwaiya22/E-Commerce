import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerHome from "./CustomerHome"
import ReactDOM from "react-dom/client";
import cookies from "js-cookie";

function CustomerLogin() {
    const [uid, setUId] = useState();
    const [upass, setUPass] = useState();
    const [ischecked, setIsChecked] = useState();

    const handleUIdText = (evt) => {
        setUId(evt.target.value);
    }
    const handleUPassText = (evt) => {
        setUPass(evt.target.value);
    }
    useEffect(() => {
        var myccokies = cookies.get('auth');
        if (myccokies != undefined) {
            var obj = JSON.parse(myccokies);
            setUId(obj.username);
            setUPass(obj.password);
        }

    }, []);
    const handleLoginButton = () => {
        var obj = {
            CUserId: uid,
            CUserPass: upass,

        }
        axios.post("http://localhost:9669/customer/login", obj)
            .then((res) => {

                if (res.data.CUserId!=undefined){
                if (res.data.status == "inActive") {
                    alert("user not active Please wait for admin Activation process")
                    return;
                }
                // cookies handling  code 
                if (ischecked == true) {
                    const userData = {
                        username: uid,
                        password: upass
                    };
                    const expirationTime =
                        new Date(new Date().getTime() + 6000000);
                    //store data in cookies
                    cookies.set('auth', JSON.stringify(userData), { expires: expirationTime })
                }
                    
                //session handling code
                const userSessionData = {
                    userfullname: res.data.CustomerName
                };

                const sessionexpirationTime = new Date(new Date().getTime() + 60000);
                //store data in session

                sessionStorage.setItem('sessionauth', JSON.stringify(userSessionData), sessionexpirationTime);

                const root = ReactDOM.createRoot(document.getElementById("root"));
                var obj = {
                    cfname: res.data.CustomerName,
                    cid:res.data.Cid,
                    cpicname:res.data.CPicName
                }
                root.render(<CustomerHome data={obj}></CustomerHome>)

                
                
            }else{
                    alert("Invalid Id/Password")
                }
            })
          }

          const handleIsRemember=()=>{
            setIsChecked(true);
          }

        return(
            <div>
                <center>
                    <table border={2}>
                    <div className="jumbotron"></div>
                    <h4 style={{backgroundColor:"yellow"}}>Customer Login form</h4>

                    <tr>
                        <td>User ID</td>
                        <td>
                            <input type="text" className="form-control" onChange={handleUIdText} value={uid}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" className="form-control" onChange={handleUPassText} value={upass}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" className="btn btn-success" onClick={handleLoginButton}>Login</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input type="checkbox"  onClick={handleIsRemember}/>
                            <span>Remember Me</span>
                        </td>
                    </tr>
                    </table>
                </center>
            </div>
        )
}export default CustomerLogin;