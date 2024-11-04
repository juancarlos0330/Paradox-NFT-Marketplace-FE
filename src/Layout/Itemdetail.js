import React, { useState } from "react";
import Header from "./Header";
import Headerslider from "./Headerslider";
import Detailpage from "../Pages/itemdetail/Detailpage";
import Contact from "./Contact";
import Footer from "./Footer";
import "../assets/css/sectiondetail.scss";

const Itemdetail = () => {
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
        <Detailpage />
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

export default Itemdetail;
