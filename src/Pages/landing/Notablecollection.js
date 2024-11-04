import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import isEmpty from "../../validations/is-empty";
import { Link } from "react-router-dom";
import { ipfs_file_path } from "../../config/config";

const Notablecollection = (props) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult(props.collections.collections.slice(0, 10));
  }, [props.collections]);

  return (
    <div className="notablecollection">
      <div className="main">
        <div className="headersection">
          <div className="logo">
            <h1>Notable Collection</h1>
          </div>
          <div className="viewall-btn-view">
            <Link to="/section" className="viewall-btn">
              View All
            </Link>
          </div>
        </div>

        {isEmpty(result) ? (
          <div className="empty-section">No Data</div>
        ) : (
          <Swiper
            slidesPerView={4}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              456: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1140: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={20}
            className="mySwiper"
          >
            {!isEmpty(result) &&
              result.map((item, key) => {
                return (
                  <SwiperSlide key={key}>
                    <Link
                      to={"/explore?collection=" + item._id}
                      className="sliderview"
                    >
                      <div className="collectionimage">
                        <img
                          src={ipfs_file_path + item.logo_image}
                          alt="image"
                        />
                      </div>
                      <div className="collectionName">
                        <h3>{item.title}</h3>
                      </div>
                      <div className="relationview">
                        <div className="view">
                          <div className="item">
                            <span className="firstpart">Floor</span>
                            <span className="secondpart">0.03 ETH</span>
                          </div>
                          <div className="item">
                            <span className="firstpart">Total Volume</span>
                            <span className="secondpart">36 ETH</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

Notablecollection.propTypes = {};

const mapStateToProps = (state) => ({
  collections: state.collections,
});

export default connect(mapStateToProps, {})(Notablecollection);
