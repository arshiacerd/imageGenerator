import React, { useState, useEffect } from "react";
import styles from "../signup/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = ({ check }) => {
  const navigate = useNavigate();
  if (check) {
    var signup_form = {
      margin: "0 auto",
      maxWidth: "-webkit-fill-available",
    };
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useAuth();
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/tools");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let sendData = await fetch(
      "https://auth-system-production.up.railway.app/v1/api/auth/signin",
      {
        method: "post",
        //   body: JSON.stringify(val.username,val.email,val.pass,val.city),
        body: JSON.stringify({
          email,
          password,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    sendData = await sendData.json();
    // console.log("sendData", sendData.result);
    console.log("sendDataLogin", sendData);

    if (sendData.success) {
      localStorage.setItem("token", sendData.data.accessToken);
      localStorage.setItem("user", JSON.stringify(sendData.data.user.name));

      console.log(sendData.data.user.name);
      setUser(sendData.data.user);
      alert(sendData.message);
      console.log("useAuth", user);
      // if (check) {
      //   navigate("/tools/:name");
      // } else {
         navigate("/tools");
      // }
    } else if (!sendData.success) {
      alert(sendData.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={signup_form}
      className={styles.signup_form}
    >
      <img src={logo} alt="" />
      <h3>Continue to AI</h3>
      <label className={styles.label}>
        <span className={styles.span}>email: </span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.span}>password: </span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </label>
      <button className={styles.btn}>Login </button>
      <p className={styles.para}>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
};

export default LoginForm;
