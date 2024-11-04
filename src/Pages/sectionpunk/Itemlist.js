import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Loading from "../../assets/image/small_loading.gif";
import isEmpty from "../../validations/is-empty";
import { ipfs_file_path } from "../../config/config";
import { useLocation } from "react-router-dom";

const Itemlist = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [filtertext, setFiltertext] = useState("");
  const [searchflag, setSearchflag] = useState(false);
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [showmoreflag, setShowmoreflag] = useState(false);

  useEffect(() => {
    var tempdata = alldata.filter((item, key) => {
      return (
        item.title.toLowerCase().indexOf(filtertext.trim().toLowerCase()) > -1
      );
    });
    setResult(tempdata);
  }, [filtertext]);

  useEffect(() => {
    if (isEmpty(params.get("category"))) {
      setResult(props.collections.collections);
      setAlldata(props.collections.collections);
    } else {
      setResult(
        !isEmpty(props.collections.collections)
          ? props.collections.collections.filter((item) => {
              return item.category == params.get("category");
            })
          : []
      );
      setAlldata(
        !isEmpty(props.collections.collections)
          ? props.collections.collections.filter((item) => {
              return item.category == params.get("category");
            })
          : []
      );
    }
  }, [props.collections]);

  const changeText = (e) => {
    if (e.target.value !== "") {
      setSearchflag(true);
    } else {
      setSearchflag(false);
    }
    setFiltertext(e.target.value.trim());
  };

  const clearfiltertext = () => {
    setFiltertext("");
    setSearchflag(false);
  };

  return (
    <div className="itemlist">
      <div className="searchsection">
        <div className="searchmain">
          <div className="searchbar">
            <svg
              className="searchicon"
              viewBox="0 0 14 14"
              width="16"
              height="16"
              xlmns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.2496 6.125C12.2496 3.70875 10.291 1.75 7.87494 1.75C5.45886 1.75 3.50024 3.70875 3.50024 6.125C3.50024 8.54125 5.45886 10.5 7.87494 10.5C10.291 10.5 12.2496 8.54125 12.2496 6.125ZM7.87494 0C11.2574 0 13.9995 2.74226 13.9995 6.125C13.9995 9.50774 11.2574 12.25 7.87494 12.25C6.4961 12.25 5.22369 11.7943 4.20005 11.0253C4.17557 11.0579 4.14853 11.0891 4.11892 11.1187L1.4941 13.7437C1.15241 14.0854 0.59843 14.0854 0.256745 13.7437C-0.08494 13.402 -0.08494 12.848 0.256745 12.5063L2.88156 9.88127C2.91118 9.85165 2.94239 9.8246 2.97492 9.80012C2.206 8.77641 1.75036 7.50392 1.75036 6.125C1.75036 2.74226 4.49243 0 7.87494 0Z"
                fill="currentColor"
              ></path>
            </svg>
            <input
              placeholder="Search"
              value={filtertext}
              onChange={(e) => changeText(e)}
            />
            <button
              className={searchflag ? "" : "search_clear_button"}
              type="button"
              onClick={() => clearfiltertext()}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                width="16"
                height="16"
                xlmns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 14L14 2"
                  stroke="currentColor"
                  strokeWidth="2"
                ></path>
                <path
                  d="M14 14L2 2"
                  stroke="currentColor"
                  strokeWidth="2"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="main">
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
            allowTouchMove={false}
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
                            <span className="firstpart">Items</span>
                            <span className="secondpart">7.8K</span>
                          </div>
                          <div className="item">
                            <span className="firstpart">Owners</span>
                            <span className="secondpart">36K</span>
                          </div>
                          <div className="item">
                            <span className="firstpart">Floor</span>
                            <span className="secondpart">36K</span>
                          </div>
                          <div className="item">
                            <span className="firstpart">Volume</span>
                            <span className="secondpart">36K</span>
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
      {!isEmpty(result) && result.length > 20 && (
        <div className="more-section">
          <button
            type="button"
            className="show-more-button"
            onClick={() => setShowmoreflag(!showmoreflag)}
          >
            {showmoreflag ? (
              <img src={Loading} alt="show more logo" />
            ) : (
              "SHOW MORE"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

Itemlist.propTypes = {};

const mapStateToProps = (state) => ({
  collections: state.collections,
});

export default connect(mapStateToProps, {})(Itemlist);
