import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import AItools from "../../data/AItools.json";

import ImageGen from "./ImageGen";

const Results = () => {
  const location = useLocation();
  const [toolsData, setToolsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // console.log("tools: ", location);
  var id;
  if (location.state) {
    id = location.state.id;
  }
  useEffect(() => {
    if (AItools) {
      setToolsData(AItools.data);
      const getData = AItools.data.filter((tool) => tool.id === id);
      setFilteredData(getData);
    }
  }, [AItools, toolsData]);
  const {
    data: tools,
    isPending,
    error,
  } = useFetch(`http://localhost:3000/data/${id}`);
  return (
    <>
      {filteredData.length > 0 &&
        filteredData.map((filteredData, index) =>
          filteredData.status === "Coming Soon" ? (
            <div key={index}>Coming Soon</div>
          ) : (
            <div key={index}>
            <ImageGen tools={filteredData} />
            </div>
          )
        )}

      {/* {filteredData.length > 0 && filteredData.map((filteredData,index)=>
      
        filteredData.status === "NEW" && (
        <ImageGen  tools={filteredData} />
      )
      )} */}

      {/* {toolsData && toolsData.status === "Coming Soon" ? (
        <div>Coming Soon</div>
      ) : (
        <ImageGen tools={toolsData} />
      )} */}
    </>
  );
};

export default Results;
