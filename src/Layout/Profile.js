import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import Address from "../Pages/profile/Address";
import Productitems from "../Pages/profile/Productitems";
import Headerslider from "./Headerslider";
import Contact from "./Contact";
import Footer from "./Footer";
import { toast } from "react-toastify";
import "../assets/css/sectionprofile.scss";

const Profile = (props) => {
  const navigate = useNavigate();
  const [dropflag, setDropflag] = useState(false);
  const [profileflag, setProfileflag] = useState(false);

  useEffect(() => {
    if (props.auth.isAuthenticated !== true) {
      toast.warning("Please Connect Wallet!");
      navigate("/");
    }
  }, []);

  const setflag = (flag) => {
    setDropflag(flag);
  };

  const setproflag = (flag) => {
    setProfileflag(flag);
  };

  return (
    <div className="home" style={{ justifyContent: "space-between" }}>
      <div className="container">
        <Header
          setflag={setflag}
          setproflag={setproflag}
          profileflag={profileflag}
          dropflag={dropflag}
        />
        <Headerslider />
        <Address />
        <Productitems />
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

Profile.propTypes = {};

const mapStateToProps = (state) => ({
  thememode: state.thememode,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Profile);
