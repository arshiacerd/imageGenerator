import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import styles from "./SignUp.module.css";
import sponser from "../../images/loginRight.png";
import logo from "../../images/logo.png";
const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, setUser } = useAuth();

  // const { data, postData, error } = useFetch(
  //   "https://auth-system-production.up.railway.app/v1/api/auth/signup",
  //   "POST"
  // );
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, name);

    // postData({ name, email, password });

    let sendData = await fetch(
      "https://auth-system-production.up.railway.app/v1/api/auth/signup",
      {
        method: "post",
        //   body: JSON.stringify(val.username,val.email,val.pass,val.city),
        body: JSON.stringify({ name, email, password }),

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    sendData = await sendData.json();
    console.log("sendData", sendData);
    if (sendData.success) {
      localStorage.setItem("token", sendData.data.accessToken);
      localStorage.setItem("user", JSON.stringify(sendData.data.user.name));
      setUser(sendData.data.user);
      alert(sendData.message);

      navigate("/tools");
    } else if (!sendData.success) {
      alert(sendData.message);
    }
  };
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/tools");
    }
  }, []);

  // useEffect(() => {
  //  if(data.success)
  //  {
  //   localStorage.setItem("token", data.data.accessToken);
  //   navigate("/tools")
  //   alert(data.message);

  //  }
  //  else {
  //   console.log(data)
  //   alert(data.message);

  //  }

  // }, [data]);

  return (
    <>
      <div className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.signup_form}>
          <img src={logo} alt="" />
          <h3>Continue to AI</h3>
          <label className={styles.label}>
            <span className={styles.span}>Name: </span>
            <input
              type="value"
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </label>
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
          <button className={styles.btn}>Sign up </button>
          <p className={styles.para}>
            Already have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </form>
        <div className={styles.img1}>
          <img src={sponser} alt="" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
