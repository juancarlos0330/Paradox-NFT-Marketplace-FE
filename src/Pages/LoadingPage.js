import React from "react";
import LoadingSrc from "../assets/image/loading.gif";
import "../assets/css/loading.scss";

const LoadingPage = () => {
  return (
    <div className="paradox-loading-section">
      <img src={LoadingSrc} alt="loading" />
    </div>
  );
};

export default LoadingPage;
