import React, { useState } from "react";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Contactdetail from "../Pages/contactus/Contactdetail";
import "../assets/css/contactus.scss";

const Contactus = () => {
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
        <Contactdetail />
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

export default Contactus;
