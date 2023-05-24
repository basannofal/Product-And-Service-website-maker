import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const naviget = useNavigate();
  const [r_name, setr_name] = useState("");
  const [r_email, setr_email] = useState("");
  const [r_password, setr_password] = useState("");
  const [r_contact, setr_contact] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const res = axios.post("/register", {
      r_name,
      r_email,
      r_password,
      r_contact,
    });
    // console.log(res);
    // window.alert(res);
    if (res.status === 400) {
      window.alert("error is already exist !!!!");
    } else {
      window.alert("Registration Successfull");
      naviget("/login", { replace: true });
    }
  };



  return (
    <>
      <h3 className="mt-5 text-capitalize text-center">
        Registration for User
      </h3>
      <hr className="mx-auto" style={{ width: "50rem" }} />

      <form
        style={{
          backGround: "rgba( 255, 255, 255, 0.3 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backDropFilter: "blur( 3.5px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
        className="mx-auto w-25"
        onSubmit={register}
        method="POST"
      >
        <div className="mb-3 mt-3 mx-3">
          <label class="form-label">Your Name</label>
          <input
            type="text"
            name="r_name"
            value={r_name}
            onChange={(e) => {
              setr_name(e.target.value);
            }}
            className="form-control rounded-0"
            required
          />
        </div>

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

        <div className="mb-3 mt-3 mx-3">
          <label class="form-label">Your Contact</label>
          <input
            type="number"
            value={r_contact}
            onChange={(e) => {
              setr_contact(e.target.value);
            }}
            name="r_contact"
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
            Register
          </button>
        </div>

        <div className="mb-3 mx-3">
          <p>
            Already have an account ?{" "}
            <span>
              <a href="/login">Login now</a>
            </span>{" "}
          </p>
        </div>
      </form>
    </>
  )
}

export default Register