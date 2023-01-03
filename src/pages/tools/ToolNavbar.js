import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useAuth";

import styles from "./ToolNavbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

const ToolNavbar = () => {
  var { user } = useAuth();
  const navigate = useNavigate();
  console.log("user.....", user);
  const { setSearch, search } = useAuth();
  // console.log("user........", user.name);
  const [auth, setAuth] = useState("");
  const [userName, setUser] = useState("");
  const [profile, setProfile] = useState("");
  // const [search, setSearch] = useState("");
  const deleteProfile = async () => {
    if (profile) {
      const confirmation = prompt("Do you really want to delete a user", "Yes");
      if (confirmation != null) {
        if (confirmation.toLowerCase() === "yes") {
          let delUser = await fetch(
            `https://auth-system-production.up.railway.app/v1/api/user/delete-user?email=${profile.email}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          delUser = await delUser.json();
          if (delUser.success) {
            alert(delUser.message);
            localStorage.removeItem("token");
            setAuth(false);
            setProfile("");
            localStorage.removeItem("images");
            localStorage.removeItem("user");

            // navigate("/tools");
          }
        }
      } else {
        console.log("deleted");
      }
    }
  };
  const getProfile = async (token) => {
    let response = await fetch(
      "https://auth-system-production.up.railway.app/v1/api/user/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    response = await response.json();
    if (response.success) {
      // setUser(response.data.name);
      console.log("data added", response);
      setProfile(response.data);

      console.log("profile", profile);
    }
  };
  const searchInput = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    var token = localStorage.getItem("token");
    setAuth(token);
    console.log("auth.....", auth);
    if (auth) {
      getProfile(token);
    }
    if (user) {
      let str = "";
      // user = user.replace(/^"(.*)"$/, "$1");
      var regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
      if (regexp.test(user)) {
        console.log("conatin space");
        let arr = user.toString().split(" ");
        if (arr.length > 1) {
          for (let i = 0; i <= arr.length - 1; i++) {
            str = str + arr[i].charAt(0);
          }
          setUser(str);

          console.log(str);
        }
      } else {
        setUser(user);
      }
    }
  }, [auth, user]);

  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="" className={styles.logo} />

      <ul>
        <li>
          <input
            type="text"
            placeholder="Search AI  Writing Tools"
            onChange={searchInput}
            className={styles.no_outline}
          />
        </li>

        <li style={{ marginRight: "20px" }}>
          {auth ? (
            <div className={styles.avatar} onClick={deleteProfile}>
              {userName && userName.substring(0, 2).toUpperCase()}
            </div>
          ) : (
            <Link className={styles.btn} to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default ToolNavbar;
