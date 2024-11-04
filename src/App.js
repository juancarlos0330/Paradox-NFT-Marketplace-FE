import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landingpage from "./Layout/Landingpage";
import Sectionpunk from "./Layout/Sectionpunk";
import Sectionexplore from "./Layout/Sectionexplore";
import Itemdetail from "./Layout/Itemdetail";
import Profile from "./Layout/Profile";
import Contactus from "./Layout/Contactus";
import Create from "./Layout/Create";
import Notfound from "./Layout/Notfound";
import { getCollectionData } from "./actions/collectionActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const { defaultAlgorithm, darkAlgorithm } = theme;

const App = (props) => {
  useEffect(() => {
    const node = document.createElement("link");
    node.setAttribute("rel", "stylesheet");
    if (localStorage.themeMode === "dark") {
      node.setAttribute("href", "/assets/css/dark.css");
    } else {
      node.setAttribute("href", "/assets/css/light.css");
    }
    node.setAttribute("id", "lightlink");
    document.getElementById("paradox-header").append(node);
    props.getCollectionData();
  }, []);

  useEffect(() => {
    if (
      props.loading.loading ||
      props.loading.authloading ||
      props.loading.nftloading ||
      props.loading.salelistloading ||
      props.loading.detailloading ||
      props.loading.bidloading
    ) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [props.loading]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          props.thememode.thememode === "dark"
            ? darkAlgorithm
            : defaultAlgorithm,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" exact element={<Landingpage />} />
          <Route path="/section" exact element={<Sectionpunk />} />
          <Route path="/explore" exact element={<Sectionexplore />} />
          <Route path="/detail" exact element={<Itemdetail />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/contact" exact element={<Contactus />} />
          <Route path="/create" exact element={<Create />} />
          <Route path="/*" exact element={<Notfound />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={props.thememode.thememode === "dark" ? "dark" : "light"}
      />
    </ConfigProvider>
  );
};

App.propTypes = {
  getCollectionData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collections: state.collections,
  thememode: state.thememode,
  loading: state.loading,
});

export default connect(mapStateToProps, { getCollectionData })(App);
