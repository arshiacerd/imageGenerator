import React, { useState, useEffect } from "react";
import styles from "./ImageGen.module.css";
import vector from "../../images/vector.png";
import LoginForm from "../login/LoginForm";
import loaderImg from "../../images/loaderImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ImageGen = ({ tools }) => {
  const navigate = useNavigate();
  const min = 1;
  const max = 2;
  console.log("tools: ", tools);

  const [auth, setauth] = useState(false);
  const [show, setshow] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [image, setImage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("");
  const [no, setNo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    // let image = localStorage.getItem("images");
    // var localImage = JSON.parse(image);
    // console.log("localImage" , image)
    if (token) {
      setauth(true);
    } else {
      setauth(false);
    }
    // if (localImage != null) {
    //   setImage(localImage);
    //   console.log("image: ", image);
    // } else {
    //   localStorage.setItem("images", JSON.stringify([]));
    // }
  }, [auth, tools]);

  const removeImage = () => {
    localStorage.removeItem("images");
  };
  const handleNumber = (e) => {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    console.log("value", value);
    setNo(value);
  };
  const ClearFields = () => {
    setPrompt("");
    setNo("");
    setSize("");
  };
  const Create = async () => {
    if (!auth) {
      setshow(true);
    } else {
      setIsPending(true);

      let response = await fetch(
        "https://auth-system-production.up.railway.app/v1/api/openai/image-generator",
        {
          method: "post",
          body: JSON.stringify({
            prompt: prompt,
            n: no,
            size: size,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let jsonData = await response.json();

      if (jsonData.success) {
        localStorage.setItem("images", JSON.stringify(jsonData.data));

        setImage(jsonData);
        setIsPending(false);
      } else {
        alert(jsonData.message);
        setIsPending(false);
        setImage("");
      }
      console.log("response", jsonData);
    }
  };
  return (
    <>
      {tools && (
        <>
          <div className={styles.container}>
            <div className={styles.form}>
              <div className={styles.form_head}>
                <h3>AI Image Generator</h3>
                <button
                  className={styles.btn}
                  onClick={() => navigate("/tools")}
                >
                  More AI Tools
                </button>
              </div>

              <form>
                {tools.textInputs.map((tool, index) => (
                  <label className={styles.label} key={index}>
                    <span className={styles.span}>{tool.name}</span>
                    {tool.type === "number" ? (
                      <input
                        type={tool.type}
                        minLength={tool.minLimit}
                        maxLength={tool.maxLimit}
                        className={styles.input_desc}
                        placeholder={tool.placeholder}
                        name={tool.name}
                        value={no}
                        onChange={handleNumber}
                      />
                    ) : tool.type === "textarea" ? (
                      <textarea
                        type={tool.type}
                        minLength={tool.minLimit}
                        maxLength={tool.maxLimit}
                        className={styles.input_desc}
                        placeholder={tool.placeholder}
                        name={tool.name}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    ) : (
                      <select
                        className={styles.input}
                        placeholder={tools.textInputs[1].placeholder}
                        onChange={(e) => setSize(e.target.value)}
                        value={size}

                        // value={size}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    )}
                  </label>
                ))}
              </form>
              <div className={styles.btm}>
                <button className={styles.btm1} onClick={ClearFields}>
                  Clear Input
                </button>
                <button className={styles.btm2} onClick={Create}>
                  {isPending ? (
                    "loading...."
                  ) : (
                    <>
                      <img src={vector} alt="" />
                      Create
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className={styles.result}>
              <div className={styles.form_head}>
                <h3>Image Results</h3>
              </div>

              {!auth && !show && (
                <div className={styles.result_text}>
                  See your INK Images appear here after you answer the questions
                  on the left.
                </div>
              )}

              <div className={styles.imageGallery}>
                {auth &&
                  JSON.parse(localStorage.getItem("images")) &&
                  !isPending &&
                  JSON.parse(localStorage.getItem("images")).map(
                    (image, index) => (
                      <div key={index} className={styles.result_img}>
                        <img src={image.url} alt="image" />
                      </div>
                    )
                  )}

                {isPending && (
                  <>
                    <img
                      src={loaderImg}
                      alt="image"
                      className={styles.loadingImg}
                    />
                    <div className={styles.loader}></div>
                  </>
                )}
              </div>
              {show && <LoginForm check={true} />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ImageGen;
