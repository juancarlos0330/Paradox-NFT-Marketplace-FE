import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import isEmpty from "../../validations/is-empty";
import { ipfs_file_path } from "../../config/config";

const Allcollection = (props) => {
  const [tabVal, setTabVal] = useState(0);
  const [datefilter, setDatefilter] = useState(1);
  const [result, setResult] = useState([]);
  const [trendingLength, setTrendingLength] = useState(0);

  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };

  useEffect(() => {
    setResult(props.collections.collections);
    setTrendingLength(Math.ceil(props.collections.collections.length / 2));
  }, [props.collections]);

  const subStrText = (str) => {
    if (str.length > 50) {
      return str.substr(0, 50) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="allcollection_section">
      <div className="main">
        <div className="search-section">
          <div className="tab-menu">
            <Tabs value={tabVal} onChange={handleChange}>
              <Tab className="tabs-tab-item" label="Trending" />
              <Tab className="tabs-tab-item" label="Top" />
            </Tabs>
          </div>
          <div className="search-box">
            <div>
              <div className="date-filter">
                <div
                  className={
                    datefilter === 1 ? "date-item active" : "date-item"
                  }
                  onClick={() => setDatefilter(1)}
                >
                  1h
                </div>
                <div
                  className={
                    datefilter === 2 ? "date-item active" : "date-item"
                  }
                  onClick={() => setDatefilter(2)}
                >
                  6h
                </div>
                <div
                  className={
                    datefilter === 3 ? "date-item active" : "date-item"
                  }
                  onClick={() => setDatefilter(3)}
                >
                  24h
                </div>
                <div
                  className={
                    datefilter === 4 ? "date-item active" : "date-item"
                  }
                  onClick={() => setDatefilter(4)}
                >
                  7d
                </div>
              </div>
            </div>
            <div>
              <Link to="/section" className="viewall-btn">
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="main-collection">
        <div className="main-section">
          <div className="section">
            <div className="title">
              <div className="first-item">COLLECTION</div>
              <div className="second-item">FLOOR PRICE</div>
              <div className="third-item">VOLUME</div>
            </div>
            {!isEmpty(result) &&
              result.slice(0, trendingLength).map((item, key) => {
                return (
                  <Link
                    className="content"
                    key={key}
                    to={"/explore?collection=" + item._id}
                  >
                    <div className="first-item">
                      <p className="no">{key + 1}</p>
                      <div className="item-image-view">
                        <img
                          src={ipfs_file_path + item.logo_image}
                          alt="item"
                        />
                      </div>
                      <div className="content-text">
                        <p className="text">{subStrText(item.title)}</p>
                        <p className="floorprice">0.31 ETH</p>
                      </div>
                    </div>
                    <div className="second-item">0.31 ETH</div>
                    <div className="third-item">9.23 ETH</div>
                  </Link>
                );
              })}
          </div>
          <div className="section">
            <div className="title">
              <div className="first-item">COLLECTION</div>
              <div className="second-item">FLOOR PRICE</div>
              <div className="third-item">VOLUME</div>
            </div>
            {!isEmpty(result) &&
              result
                .slice(trendingLength, trendingLength * 2)
                .map((item, key) => {
                  return (
                    <Link
                      className="content"
                      key={key}
                      to={"/explore?collection=" + item._id}
                    >
                      <div className="first-item">
                        <p className="no">{key + trendingLength + 1}</p>
                        <div className="item-image-view">
                          <img
                            src={ipfs_file_path + item.logo_image}
                            alt="item"
                          />
                        </div>
                        <div className="content-text">
                          <p className="text">{subStrText(item.title)}</p>
                          <p className="floorprice">0.11 ETH</p>
                        </div>
                      </div>
                      <div className="second-item">0.11 ETH</div>
                      <div className="third-item">2.34 ETH</div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

Allcollection.propTypes = {};

const mapStateToProps = (state) => ({
  collections: state.collections,
});

export default connect(mapStateToProps, {})(Allcollection);
