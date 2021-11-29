import React, { useState } from "react";
import s from "./Login.module.css";
import { connect } from "react-redux";
import BasicTextFields from "./TextField";
import { loginUser } from "../../actions/authActions";
import { logout } from "../../actions/authActions";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className={s.Login}>
      <div className={s.loginLeft}>
        <div className={s.loginCompanyLogo}>
          <img
            src="images/monadleadlogo.svg"
            alt="monadleadlogo"
            className={s.loginCompanyLogoImage}
          />
        </div>
        <div className={s.loginCompanyDescription}>
          <p>Terminal Management System</p>
        </div>
        <div className={s.loginLeftCenter}>
          <p className={s.welcome}>Welcome Back!</p>
          <form onSubmit={handleSubmit}>
            <BasicTextFields
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
            />

            <p className={s.forgotPassword}>Forgot password?</p>
            <button type="submit" className={s.loginButton}>
              Login
            </button>
          </form>
          <p className={s.trademarkText}>
            ™2021 MonetizeAd All Rights Reserved
          </p>
        </div>
      </div>
      <div className={s.loginRight}>
        <img src="images/tree.jpg" />
      </div>
    </div>
  );
}

export default connect(null, { loginUser, logout })(Login);
