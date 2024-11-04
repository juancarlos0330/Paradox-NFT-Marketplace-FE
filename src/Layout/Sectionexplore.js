import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import Explorelanding from "../Pages/sectionexplore/Explorelanding";
import Exploreitemlist from "../Pages/sectionexplore/Exploreitemlist";
import Contact from "./Contact";
import Footer from "./Footer";
import "../assets/css/sectionexplore.scss";
import Headerslider from "./Headerslider";

const Sectionexplore = (props) => {
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
        <Explorelanding />
        <Exploreitemlist />
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

Sectionexplore.propTypes = {};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, {})(Sectionexplore);
