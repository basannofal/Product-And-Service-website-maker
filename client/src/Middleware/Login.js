import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const naviget = useNavigate();

    const [r_email, setr_email] = useState("");
    const [r_password, setr_password] = useState("");


    const login = async (e) => {
        e.preventDefault();

        axios
            .post("/login", {
                r_email: r_email,
                r_password: r_password,
            })
            .then((res) => {
                console.log(res.data);

                if (res.data.message) {
                    window.alert("Email or Password are not match");
                    naviget("/adminlogin", { replace: true });
                } else {
                    window.alert("Email or Password are match");
                    localStorage.setItem("isLogin", JSON.stringify(res.data[0]))
                    const id = res.data[0].id
                    naviget(`/dashboard/${id}`, { replace: true });
                }
            });
    };


    useEffect(() => {
        const token = localStorage.getItem("isLogin")
        if (token === null) {

        } else {
            const data = JSON.parse(token)
            console.log(data);
            naviget(`/dashboard/${data.id}`, { replace: true });
        }
    }, []);

    return (
        <>

        <div  style={{marginTop:"10vh"}}>

            <h3 className="mt-5 text-capitalize text-center" >Login for User</h3>
            <hr className="mx-auto mb-5" style={{ width: "50rem" }} />


            <form
                style={{
                    backGround: "rgba( 255, 255, 255, 0.3 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backDropFilter: "blur( 3.5px )",
                    borderRadius: "10px",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                }}
                className="mx-auto w-25"
                onSubmit={login}
                method="POST"
            >
                <div className="mb-3 mt-3 mx-3">
                    <label class="form-label">Your Email</label>
                    <input
                        type="email"
                        value={r_email}
                        onChange={(e) => {
                            setr_email(e.target.value);
                        }}
                        name="r_email"
                        className="form-control rounded-0"
                        required
                    />
                </div>

                <div className="mb-3 mt-3 mx-3">
                    <label class="form-label">Your Password</label>
                    <input
                        type="password"
                        value={r_password}
                        onChange={(e) => {
                            setr_password(e.target.value);
                        }}
                        name="r_password"
                        className="form-control rounded-0"
                        required
                    />
                </div>

                <div className="mb-3 mx-3">
                    <button
                        type="submit"
                        name="submit"
                        // onSubmit={postdata}
                        className="btn btn-primary rounded-0 w-100"
                    >
                        Login
                    </button>
                </div>
                <div className="mb-3 mx-3">
                    <p>
                        forgot password?{" "}
                        <span>
                            <a href="/adminlogin">click here</a>
                        </span>{" "}
                    </p>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login