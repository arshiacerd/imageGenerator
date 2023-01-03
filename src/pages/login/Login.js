import React, { useState, useEffect } from "react";
// import styles from "./Login.module.css";
import styles from "../signup/SignUp.module.css";
import sponser from "../../images/loginRight.png";
import LoginForm from "./LoginForm";

const Login = () => {
 
  return (
    <>
      <div className={styles.main}>
       <LoginForm check={false}/>
        <div className={styles.img1}>
          <img src={sponser} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
