import React from "react";

const Logout = () => {
  const removeToken = localStorage.removeItem("token");
  if (removeToken) {
    alert("user has been successfully logout...");
  }
};

export default Logout;
