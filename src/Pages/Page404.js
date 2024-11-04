import React from "react";

const Page404 = () => {
  return (
    <div className="page-404-home">
      <div className="main-section">
        <div className="section">
          <h2 className="title">404</h2>
          <p className="sub-title">This page is lost.</p>
          <p className="page-content">
            We've explored deep and wide, but we can't find the page you were
            looking for.
          </p>
          <div className="home-button-view">
            <a className="home-to-button" href="/">
              Navigate back home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
