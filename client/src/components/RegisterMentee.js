import React from "react";
import "../App.css";
import { useState } from "react";
import Axios from "axios";

export default function RegisterMentee() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const registerMentee = () => {
    Axios.post("http://localhost:3002/signup-mentee", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      setRegisterStatus(response.data);
    });
  };
  return (
    <div className="signup-mentee-form">
      <h1>Sign Up</h1>
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="text"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <button onClick={registerMentee}>Register</button>
      <h1>{registerStatus}</h1>
    </div>
  );
}
