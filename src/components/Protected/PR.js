import React from "react";
import { useNavigate } from "react-router-dom";

const PR = ({Component}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default PR;
