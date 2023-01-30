import React from "react";
import styles from "./Card.module.css";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ img, title, status, subtitle, route, id }) => {
  const navigate = useNavigate();
  const handleClick = (id, route) => {
    console.log("sadsa", img, title, status, subtitle, route, id);

    navigate(`/tools/${route}`, { state: { id: id } });
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.card_img}>
          <img src={img} alt="" />
        </div>
        <div className={styles.card_content}>
          <div className={styles.card_head}>
            {/* <Link to={`/tools/${route}`}> */}

            <h5 onClick={() => handleClick(id, route)}> {title}</h5>
            {/* </Link> */}
            <div className={styles.card_status}>{status}</div>
          </div>
          <div className={styles.card_detail}>{subtitle}</div>
        </div>
      </div>
    </>
  );
};

export default Card;
