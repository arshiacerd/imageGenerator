import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Tools.module.css";
import { useFetch } from "../../hooks/useFetch";

import { Link } from "react-router-dom";

import Card from "./Card";
import ToolNavbar from "./ToolNavbar";
const Tools = () => {
  const { search } = useAuth();
  const [toolsData, setToolsData] = useState([]);

  // console.log("user", user);
  const {
    data: tools,
    isPending,
    error,
  } = useFetch("http://localhost:3000/data");
  useEffect(() => {
    if (tools) {
      setToolsData(tools);
    }
    if (search.length > 0) {
      // const str = search.charAt(0).toUpperCase() + search.slice(1);
      const str = search.toLowerCase();
      let getData = toolsData.filter((tool) => {
        return (
          tool.name.toLowerCase().match(str) ||
          tool.subtitle.toLowerCase().match(str)
        );
      });
      setToolsData(getData);
    } else if (search.length == 0) {
      setToolsData(tools);
    }
  }, [tools, search]);

  // console.log("tools", tools);
  return (
    <>
      {/* <nav className={styles.navbar}>
        <ul>
          <li>hello</li>

          <li>
            <input type="text" />
          </li>
          <li className={styles.title}>profile</li>
        </ul>
      </nav> */}
      <div className={styles.container}>
        <ToolNavbar />

        <div className={styles.content}>
          <h2>AI Writing Tools</h2>
          <div className={styles.grid_container}>
            {toolsData &&
              toolsData.map((tool, index) => (
                <div key={index}>
                  {/* <img src={tool.img} alt="sfs" /> */}
                  <Card
                    id={tool.id}
                    route={tool.route}
                    img={tool.img}
                    title={tool.name}
                    status={tool.status}
                    subtitle={tool.subtitle}
                  />
                </div>
              ))}
            {toolsData.length == 0 && <h3>No Results Found</h3>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools;
