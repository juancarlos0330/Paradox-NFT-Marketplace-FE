import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import Headerslider from "./Headerslider";
import Contact from "./Contact";
import Footer from "./Footer";
import SectionCreate from "../Pages/sectioncreate/SectionCreate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/sectioncreate.scss";

const Create = (props) => {
  const navigate = useNavigate();
  const [dropflag, setDropflag] = useState(false);
  const [profileflag, setProfileflag] = useState(false);

  const setflag = (flag) => {
    setDropflag(flag);
  };

  const setproflag = (flag) => {
    setProfileflag(flag);
  };

  useEffect(() => {
    if (props.auth.isAuthenticated !== true) {
      toast.warning("Please Connect Wallet!");
      navigate("/");
    }
  }, []);

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
        <SectionCreate />
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

Create.propTypes = {};

const mapStateToProps = (state) => ({
  thememode: state.thememode,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Create);
