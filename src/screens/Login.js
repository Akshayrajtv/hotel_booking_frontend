import React, { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    async function login() {
        const user = {
            email,
            password,
        };
        try {
            // Use proper syntax to access response data
            setloading(true);
            const result = await axios.post("/api/users/login", user);
            console.log(result);
            setloading(false);
            localStorage.setItem("currentUser", JSON.stringify(result));
            if (result) {
                window.location.href = "/home";
            }

            // Access response data here
        } catch (error) {
            console.log(error);
            setloading(false);
            seterror(true);
        }
    }

    return (
        <div>
            {loading && <Loading />}
            <div className="row justify-content-center mt-5">
                
                <div className="col-md-5 box">
                {error && <Error message="Invalid Credentials" />}
                    <div>
                        <h1>
                            <b>Login</b>
                        </h1>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="email"
                            value={email}
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                        />

                        <button className="btn btn-primary" onClick={login}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
