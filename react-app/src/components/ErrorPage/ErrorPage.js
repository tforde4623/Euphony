import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import wompwomp from "../images/404EuphonyTransparent.svg";
import "./errorpage.css";

const ErrorPage = () => {
  const history = useHistory();
  setTimeout(() => {
    history.push("/");
  }, 4000);

  return (
    <div className="errorpage">
      <img id="wompwompimg" alt="404" src={wompwomp}></img>
      <h1 id="words" className="dark_medium">
        The page you're looking for doesn't exist.
      </h1>
    </div>
  );
};

export default ErrorPage;
