import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";
import isEmpty from "../validations/is-empty";
import { ipfs_file_path } from "../config/config";
import DefaultFeaturedImage from "../assets/image/default_featured_image_collection.png";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Headerslider = (props) => {
  const [sliderResult, setSliderResult] = useState([]);

  useEffect(() => {
    if (isEmpty(props.collections.collections)) {
      setSliderResult([]);
    } else {
      setSliderResult(props.collections.collections);
    }
  }, [props.collections]);

  return (
    <>
      {isEmpty(sliderResult) ? null : (
        <div className="headerslider">
          <Swiper
            modules={[Pagination]}
            pagination
            slidesPerView={1}
            className="mySwiper"
          >
            {sliderResult.map((item, key) => {
              return (
                <SwiperSlide key={key}>
                  <div className="sliderview">
                    <div className="collectionimage">
                      {isEmpty(item.banner_image) ? (
                        <img
                          src={DefaultFeaturedImage}
                          className="sliderimg"
                          alt={"slider" + key}
                        />
                      ) : (
                        <img
                          src={ipfs_file_path + item.banner_image}
                          className="sliderimg"
                          alt={"slider" + key}
                        />
                      )}
                    </div>
                    <div className="slider-detail-view">
                      <h2>{item.title}</h2>
                      <div className="slider-detail-main">
                        <div className="detail-items">
                          <div className="detail-item-title">{item.symbol}</div>
                          <div className="detail-item-text">
                            <Link to={"/explore?collection=" + item._id}>
                              VIEW COLLECTION
                            </Link>
                          </div>
                        </div>
                        <div className="detail-items">
                          <div className="detail-item-title">FLOORPRICE</div>
                          <div className="detail-item-text">49.85</div>
                        </div>
                        <div className="detail-items">
                          <div className="detail-item-title">VOLUME</div>
                          <div className="detail-item-text">426.90</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};

Headerslider.propTypes = {};

const mapStateToProps = (state) => ({
  thememode: state.thememode,
  collections: state.collections,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Headerslider);
