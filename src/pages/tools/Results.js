import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import ImageGen from "./ImageGen";

const Results = () => {
  const location = useLocation();
  // console.log("tools: ", location);

  var id;
  if (location.state) {
    id = location.state.id;
  }

  const {
    data: tools,
    isPending,
    error,
  } = useFetch(`http://localhost:3000/data/${id}`);

  return (
    <>
      {tools && tools.status === "Coming Soon" ? (
        <div>Coming Soon</div>
      ) : (
        <ImageGen tools={tools} />
      )}
    </>
  );
};

export default Results;
