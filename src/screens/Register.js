import React, { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

function Register() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword,
            };
            try {
                // Use proper syntax to access response data
                setloading(true);
                const result = await axios.post("/api/users/register", user);
                if (result) {
                    setloading(false);
                    setsuccess(true);
                    setname("");
                    setemail("");
                    setpassword("");
                    setcpassword("");
                }
                // Access response data here
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(true);
            }
        } else {
            alert("Passwords not match");
        }
    }

    return (
        <div>
            {loading && <Loading />}
            {error && (
                <Error message="Something went wrong. Please try again later." />
            )}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 box">
                    {success && <Success message="Registration Success" />}
                    <div>
                        <h1>
                            <b>Register</b>{" "}
                        </h1>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="name"
                            value={name}
                            onChange={(e) => {
                                setname(e.target.value);
                            }}
                        />
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
                        <input
                            type="password"
                            className="form-control"
                            placeholder="confirm password"
                            value={cpassword}
                            onChange={(e) => {
                                setcpassword(e.target.value);
                            }}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={register}
                            type="button" // Add type="button" to prevent form submission
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
