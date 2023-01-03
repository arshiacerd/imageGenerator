import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../images/logo.png";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const [auth, setAuth] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    } else {
      setAuth(null);
    }
  }, []);
  const logout = () => {
    const removeToken = localStorage.removeItem("token");
    localStorage.removeItem("images");
    localStorage.removeItem("user");

    if (removeToken) {
      alert("user has been successfully logout...");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          
          <ul>
            <div className={styles.first}>
              <li>
                <img src={logo} alt="" />
              </li>
              <li className={styles.title}>
                <Link to="/tools">TOOLS</Link>
              </li>
            </div>
            <div className={styles.second}>
              <li>
                <div className={styles.menu_icon}>
                  <Hamburger
                    direction="right"
                    color="#e45c96"
                    toggled={isOpen}
                    toggle={handleToggle}
                  />
                </div>
              </li>

              {!auth && (
                <>
                  <li
                    className={
                      isOpen ? styles.menu_listOpen : styles.menu_listClose
                    }
                  >
                    <Link to="/signup">SIGNUP</Link>
                  </li>
                  <li
                    className={
                      isOpen ? styles.menu_listOpen : styles.menu_listClose
                    }
                  >
                    <Link to="/login">LOGIN</Link>
                  </li>
                </>
              )}
              {auth && (
                <li
                  className={
                    isOpen ? styles.menu_listOpen : styles.menu_listClose
                  }
                >
                  <Link to="/login" onClick={logout}>
                    LOGOUT
                  </Link>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
