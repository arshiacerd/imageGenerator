import React, { useState, useEffect, useCallback } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [options, setoOtions] = useState(null);
  const postData = (postData) => {
    setoOtions({
      method: "post",

      body: JSON.stringify(postData),

      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  var response, jsonData;
  const handleClick = async (fetchOptions) => {
    setIsPending(true);
    const controller = new AbortController();

    try {
      response = await fetch(url, { signal: controller.signal });
      console.log("response......." , response)
      if (!response.ok) {
      console.log(response)

        throw new Error("could not fetch data");
      }

      jsonData = await response.json();
      setData(jsonData);
      setIsPending(false);
    } catch (err) {
      setIsPending(false);
      setError(err);
      // setData(await response.json())
      console.log("could not fetch data: ", err);
    }

    //  return jsonData;
  };

  useEffect(() => {
    const controller = new AbortController();
    if (method === "GET") {
      handleClick();
    }
    if (method === "POST" && options) {
      handleClick(options);
    }
    return () => {
      controller.abort();
    };
  }, [url, options, method]);
  return { data, isPending, error, postData };
};
