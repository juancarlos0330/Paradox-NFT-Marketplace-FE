import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/explore_logo.png";

const Paradoxs = () => {
  return (
    <div className="paradoxs">
      <div className="main">
        <div className="back-section"></div>
        <div className="main-section">
          <div className="logo-section">
            <img src={Logo} className="main-img-logo" />
          </div>
          <div className="stick-section"></div>
          <div className="content-section">
            <div className="content-view">
              <p className="content-text">
                Discover the ultimate hub for NFTs and in-game rewards in the
                Paradox Metaverse!
              </p>
              <p className="content-text">
                Earn in-game rewards as you explore the Metaverse. Don't wait -
                start your journey to greatness today!
              </p>
            </div>
          </div>
          <div className="explore-section">
            <Link to="/section">EXPLORE ALL</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paradoxs;
