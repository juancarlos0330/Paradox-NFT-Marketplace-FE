import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import Headerslider from "./Headerslider";
import Punklanding from "../Pages/sectionpunk/Punklanding";
import Itemlist from "../Pages/sectionpunk/Itemlist";
import Contact from "./Contact";
import Footer from "./Footer";
import "../assets/css/sectionpunk.scss";
import { useLocation } from "react-router-dom";
import isEmpty from "../validations/is-empty";

const Sectionpunk = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [dropflag, setDropflag] = useState(false);
  const [profileflag, setProfileflag] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (isEmpty(params.get("category"))) {
      setCategory("");
    } else {
      setCategory(params.get("category"));
    }
  }, []);

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
        <Punklanding category={category} />
        <Itemlist category={category} />
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

Sectionpunk.propTypes = {};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, {})(Sectionpunk);
