import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FlareIcon from "@mui/icons-material/Flare";
import CameraIcon from "@mui/icons-material/Camera";

const Explorecategory = () => {
  const navigate = useNavigate();

  const handleSetCategory = (ctg) => {
    navigate("/section?category=" + ctg);
  };

  return (
    <div className="explorecategory">
      <div className="main">
        <div className="headersection">
          <div className="logo">
            <h1>Explore Categories</h1>
          </div>
          <div className="viewall-btn-view">
            <Link to="/section" className="viewall-btn">
              View All
            </Link>
          </div>
        </div>
        <div className="explore-main-section">
          <div
            className="category-item active"
            onClick={() => handleSetCategory("ART")}
          >
            <CropOriginalIcon />
            ART
          </div>
          <div
            className="category-item active"
            onClick={() => handleSetCategory("GAMING")}
          >
            <SportsEsportsIcon />
            Gaming
          </div>
          <div
            className="category-item active"
            onClick={() => handleSetCategory("MEMBERSHIP")}
          >
            <PersonAddAltIcon />
            Membership
          </div>
          <div
            className="category-item active"
            onClick={() => handleSetCategory("PFPS")}
          >
            <FlareIcon />
            Pfps
          </div>
          <div
            className="category-item active"
            onClick={() => handleSetCategory("PHOTOGRAPHY")}
          >
            <CameraIcon />
            Photography
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorecategory;
