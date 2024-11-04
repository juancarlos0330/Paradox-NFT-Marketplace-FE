import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../Layout/Header";
import Headerslider from "../Layout/Headerslider";
import Allcollection from "../Pages/landing/Allcollection";
import Paradoxs from "../Pages/landing/Paradoxs";
import Notablecollection from "../Pages/landing/Notablecollection";
import Explorecategory from "../Pages/landing/Explorecategory";
import Contact from "../Layout/Contact";
import Footer from "../Layout/Footer";
import "../assets/css/landing.scss";

const Landingpage = (props) => {
  const [dropflag, setDropflag] = useState(false);
  const [profileflag, setProfileflag] = useState(false);

  const setflag = (flag) => {
    setDropflag(flag);
  };

  const setproflag = (flag) => {
    setProfileflag(flag);
  };

  return (
    <div className="home">
      <div className="container">
        <Header
          setflag={setflag}
          setproflag={setproflag}
          profileflag={profileflag}
          dropflag={dropflag}
        />
        <Headerslider />
        <Allcollection />
        <Paradoxs />
        <Notablecollection />
        <Explorecategory />
        <Contact />
        <Footer />
      </div>
      <div
        className={
          dropflag || profileflag
            ? "background-for-modal"
            : "background-for-modal-none"
        }
        id="backgroundformodal"
      ></div>
    </div>
  );
};

Landingpage.propTypes = {};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, {})(Landingpage);
