import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import AdminHome from "./AdminHome";

function AdminLogin() {
    const [uid, setUId] = useState();
    const [upass, setUPass] = useState();

    const handleUIdText = (evt) => {
        setUId(evt.target.value);
    };
    const handleUPassText = (evt) => {
        setUPass(evt.target.value);
    };

    const handleLoginButton = () => {
        if (uid === "2210" && upass === "1234") {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<AdminHome />);
        } else {
            alert("Invalid Id/Password");
        }
    };

    return (
        <div className="admin-login-container">
            <center>
                <h4 className="admin-login-heading">Administrator Login</h4>
                <table className="admin-login-table">
                    <tbody>
                        <tr>
                            <td>User Id</td>
                            <td>
                                <input
                                    type="text"
                                    className="admin-login-input"
                                    onChange={handleUIdText}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input
                                    type="password"
                                    className="admin-login-input"
                                    onChange={handleUPassText}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button
                                    type="button"
                                    className="admin-login-button"
                                    onClick={handleLoginButton}
                                >
                                    Login
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default AdminLogin;
