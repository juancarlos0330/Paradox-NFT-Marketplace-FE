import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import _, { filter, transform } from "lodash";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../../assets/image/small_loading.gif";
import { useLocation } from "react-router-dom";
import isEmpty from "../../validations/is-empty";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl, ipfs_file_path } from "../../config/config";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const activitydatas = [
  {
    id: 1,
    src: require("../../assets/image/slider1.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.6 ETH",
    quantity: 1,
    time: "5 days ago",
    type: "sale",
  },
  {
    id: 2,
    src: require("../../assets/image/slider2.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.481 ETH",
    quantity: 1,
    time: "6 days ago",
    type: "sale",
  },
  {
    id: 3,
    src: require("../../assets/image/slider3.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.69 ETH",
    quantity: 1,
    time: "8 days ago",
    type: "sale",
  },
  {
    id: 4,
    src: require("../../assets/image/slider4.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.98 ETH",
    quantity: 1,
    time: "10 days ago",
    type: "sale",
  },
  {
    id: 5,
    src: require("../../assets/image/slider1.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.25 ETH",
    quantity: 1,
    time: "11 days ago",
    type: "sale",
  },
  {
    id: 6,
    src: require("../../assets/image/slider1.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.734 ETH",
    quantity: 1,
    time: "14 days ago",
    type: "sale",
  },
  {
    id: 1,
    src: require("../../assets/image/slider1.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.6 ETH",
    quantity: 1,
    time: "5 days ago",
    type: "sale",
  },
  {
    id: 2,
    src: require("../../assets/image/slider2.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.481 ETH",
    quantity: 1,
    time: "6 days ago",
    type: "sale",
  },
  {
    id: 3,
    src: require("../../assets/image/slider3.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.69 ETH",
    quantity: 1,
    time: "8 days ago",
    type: "sale",
  },
  {
    id: 4,
    src: require("../../assets/image/slider4.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.98 ETH",
    quantity: 1,
    time: "10 days ago",
    type: "sale",
  },
  {
    id: 5,
    src: require("../../assets/image/slider1.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.25 ETH",
    quantity: 1,
    time: "11 days ago",
    type: "sale",
  },
  {
    id: 6,
    src: require("../../assets/image/slider1.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.734 ETH",
    quantity: 1,
    time: "14 days ago",
    type: "sale",
  },
  {
    id: 1,
    src: require("../../assets/image/slider1.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.6 ETH",
    quantity: 1,
    time: "5 days ago",
    type: "sale",
  },
  {
    id: 2,
    src: require("../../assets/image/slider2.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.481 ETH",
    quantity: 1,
    time: "6 days ago",
    type: "sale",
  },
  {
    id: 3,
    src: require("../../assets/image/slider3.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.69 ETH",
    quantity: 1,
    time: "8 days ago",
    type: "sale",
  },
  {
    id: 4,
    src: require("../../assets/image/slider4.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.98 ETH",
    quantity: 1,
    time: "10 days ago",
    type: "sale",
  },
  {
    id: 5,
    src: require("../../assets/image/slider1.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.25 ETH",
    quantity: 1,
    time: "11 days ago",
    type: "sale",
  },
  {
    id: 6,
    src: require("../../assets/image/slider1.png"),
    name: "PUNKS: The Hunt for the Lost Robbies",
    address: "0x5778C1A226302F75D8078D3d95ec546334D0a5bf",
    price: "0.734 ETH",
    quantity: 1,
    time: "14 days ago",
    type: "sale",
  },
];

const Exploreitemlist = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [tabVal, setTabVal] = useState(0);
  const [filtertext, setFiltertext] = useState("");
  const [searchflag, setSearchflag] = useState(false);
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [gridmodeflag, setGridmodeview] = useState(4);
  const [filterbarflag, setFilterbarflag] = useState(true);
  const [showmoreflag, setShowmoreflag] = useState(false);
  const [filterItemList, setFilterItemList] = useState([]);
  const [listForFilter, setListForFilter] = useState([]);
  const [filterDisplayList, setFilterDisplayList] = useState({});
  const [priceFilterFlag, setPriceFilterFlag] = useState(false);

  useEffect(() => {
    if (!isEmpty(params.get("collection"))) {
      axios
        .post(apiUrl + "/api/nfts/getNFTItemsbyCollectionID", {
          collectionID: params.get("collection"),
        })
        .then((res) => {
          setResult(res.data);
          !isEmpty(res.data) &&
            res.data.map((item, key) => {
              item.nft.properties.map((property, keys) => {
                listForFilter.push(property);
                setListForFilter([...listForFilter]);
              });
            });
          setAlldata(res.data);
        })
        .catch((err) => {
          toast.error("API Network Error!");
          setResult([]);
          setAlldata([]);
        });
    }
  }, []);

  useEffect(() => {
    const filterData = isEmpty(listForFilter)
      ? {}
      : listForFilter.reduce((catsSoFar, { type, name }) => {
          if (!catsSoFar[type]) catsSoFar[type] = [];
          catsSoFar[type].push(name);
          catsSoFar[type] = catsSoFar[type].filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
          return catsSoFar;
        }, {});
    setFilterDisplayList(filterData);
  }, [listForFilter]);

  useEffect(() => {
    var tempdata = alldata.filter((item, key) => {
      return (
        item.nft.title.toLowerCase().indexOf(filtertext.trim().toLowerCase()) >
        -1
      );
    });
    setResult(tempdata);
  }, [filtertext]);

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth <= 500) {
        setGridmodeview(5);
      } else if (window.innerWidth <= 690) {
        setGridmodeview(2);
      } else if (window.innerWidth <= 1086 && filterbarflag === true) {
        setGridmodeview(2);
      } else {
        setGridmodeview(4);
      }
    });
  }, []);

  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };

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

  const handleSetFilterList = (checked, item, key, category) => {
    if (checked) {
      setFilterItemList([
        ...filterItemList,
        {
          item,
          key,
          category,
        },
      ]);
    } else {
      let tempFilterItemList = [...filterItemList];
      const temps = tempFilterItemList.filter((items) => {
        return !_.isEqual(items, { item, key, category });
      });
      setFilterItemList(temps);
      document.getElementById(category + key + item).checked = false;
    }
  };

  const clearFilterItemList = async () => {
    if (!isEmpty(filterItemList)) {
      await filterItemList.map((item, key) => {
        handleSetFilterList(false, item.item, item.key, item.category);
      });
      await setFilterItemList([]);
    }
  };

  return (
    <div className="exploreitemlist">
      <Box className="tabs-box">
        <Tabs value={tabVal} onChange={handleChange} centered>
          <Tab className="tabs-tab-items" label="NFTs" />
          <Tab className="tabs-tab-items" label="Activity" />
        </Tabs>
      </Box>
      {tabVal === 0 ? (
        <div className="nfts-section">
          <div className="nfts-main">
            <div className="filter-btn-div">
              <button
                type="button"
                onClick={() => setFilterbarflag(!filterbarflag)}
              >
                {filterbarflag ? (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    width="14"
                    height="14"
                    xlmns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(90deg)" }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    width="14"
                    height="14"
                    xlmns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 16L12 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 16L4 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M20 8L18 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M12 8L4 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <circle cx="9" cy="16" r="3" fill="currentColor"></circle>
                    <circle cx="15" cy="8" r="3" fill="currentColor"></circle>
                  </svg>
                )}
                <span>Filters</span>
              </button>
            </div>
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
            <div className="filter-btn-div">
              <button type="button">
                <span>PUNKS COMIC 2 MAIN EDITION</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  width="14"
                  height="14"
                  xlmns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="filter-btn-div">
              <button
                type="button"
                onClick={() => setPriceFilterFlag(!priceFilterFlag)}
              >
                <span>
                  {priceFilterFlag
                    ? "PRICE: HIGH TO LOW"
                    : "PRICE: LOW TO HIGH"}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  width="14"
                  height="14"
                  xlmns="http://www.w3.org/2000/svg"
                  style={
                    priceFilterFlag
                      ? { transform: "rotate(180deg)" }
                      : { transform: "rotate(0deg)" }
                  }
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="viewmode">
              <button
                type="button"
                className={gridmodeflag === 4 ? "active" : ""}
                onClick={() => setGridmodeview(4)}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  width="16"
                  height="16"
                  xlmns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 0C9.89543 0 9 0.89543 9 2V5C9 6.10457 9.89543 7 11 7H14C15.1046 7 16 6.10457 16 5V2C16 0.895431 15.1046 0 14 0H11ZM11 9C9.89543 9 9 9.89543 9 11V14C9 15.1046 9.89543 16 11 16H14C15.1046 16 16 15.1046 16 14V11C16 9.89543 15.1046 9 14 9H11ZM0 11C0 9.89543 0.895431 9 2 9H5C6.10457 9 7 9.89543 7 11V14C7 15.1046 6.10457 16 5 16H2C0.89543 16 0 15.1046 0 14V11ZM2 0C0.895431 0 0 0.89543 0 2V5C0 6.10457 0.89543 7 2 7H5C6.10457 7 7 6.10457 7 5V2C7 0.895431 6.10457 0 5 0H2Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className={gridmodeflag === 3 ? "active" : ""}
                onClick={() => setGridmodeview(3)}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  width="16"
                  height="16"
                  xlmns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2ZM0 8C0 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8C4 9.10457 3.10457 10 2 10C0.895431 10 0 9.10457 0 8ZM2 12C0.895431 12 0 12.8954 0 14C0 15.1046 0.895431 16 2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12ZM6 2C6 0.895431 6.89543 0 8 0C9.10457 0 10 0.895431 10 2C10 3.10457 9.10457 4 8 4C6.89543 4 6 3.10457 6 2ZM8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6ZM6 14C6 12.8954 6.89543 12 8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14ZM14 0C12.8954 0 12 0.895431 12 2C12 3.10457 12.8954 4 14 4C15.1046 4 16 3.10457 16 2C16 0.895431 15.1046 0 14 0ZM12 8C12 6.89543 12.8954 6 14 6C15.1046 6 16 6.89543 16 8C16 9.10457 15.1046 10 14 10C12.8954 10 12 9.10457 12 8ZM14 12C12.8954 12 12 12.8954 12 14C12 15.1046 12.8954 16 14 16C15.1046 16 16 15.1046 16 14C16 12.8954 15.1046 12 14 12Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="nfts-content">
            <div className="content">
              {filterbarflag && (
                <div className="filterbar">
                  <div className="background">
                    <div className="bar">
                      <div className="main">
                        {Object.keys(filterDisplayList).map((objectKey) => {
                          return (
                            <div className="filter-section" key={objectKey}>
                              <div className="filter-section-title">
                                {objectKey}
                              </div>
                              <div className="filter-section-content">
                                {filterDisplayList[objectKey].map(
                                  (item, key) => {
                                    return (
                                      <div
                                        className="filter-section-item"
                                        key={key}
                                      >
                                        <input
                                          type="checkbox"
                                          id={objectKey + key + item}
                                          name={"filter-" + objectKey}
                                          value={item}
                                          onClick={(e) =>
                                            handleSetFilterList(
                                              e.target.checked,
                                              item,
                                              key,
                                              objectKey
                                            )
                                          }
                                        />
                                        {item}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="filterbottom">
                        <div className="bottom-main">
                          <button
                            className="apple_btn"
                            type="button"
                            onClick={clearFilterItemList}
                          >
                            Clear filters
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="filter-content">
                {filterItemList.length > 0 ? (
                  <div className="filter-list">
                    {filterItemList.map((item, key) => {
                      return (
                        <div className="filter-list-item" key={key}>
                          <p>
                            {item.category}: {item.item}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              handleSetFilterList(
                                false,
                                item.item,
                                item.key,
                                item.category
                              )
                            }
                          >
                            <CloseIcon />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                {isEmpty(result) ? (
                  <Box style={{ width: "100%" }}>
                    <p className="empty-section">No Data</p>
                  </Box>
                ) : (
                  <Box style={{ width: "100%" }}>
                    <Grid container spacing={1}>
                      <Grid container item spacing={1}>
                        <React.Fragment>
                          {result
                            .sort((a, b) => {
                              return priceFilterFlag
                                ? b.price - a.price
                                : a.price - b.price;
                            })
                            .map((item, key) => {
                              if (isEmpty(filterItemList)) {
                                return (
                                  <Grid
                                    item
                                    xs={
                                      gridmodeflag === 3
                                        ? 3
                                        : gridmodeflag === 4
                                        ? 4
                                        : gridmodeflag === 5
                                        ? 12
                                        : 6
                                    }
                                    key={key}
                                  >
                                    <Link
                                      to={"/detail?item=" + item.nft._id}
                                      className="sliderview"
                                    >
                                      <div className="collectionimage">
                                        <img
                                          src={
                                            ipfs_file_path +
                                            item.nft.attach_file
                                          }
                                          alt="item"
                                        />
                                      </div>
                                      <div className="collectionName">
                                        <h3>{item.nft.title}</h3>
                                      </div>
                                      <div className="relationview">
                                        <div className="view">
                                          <div className="item">
                                            <span className="firstpart">
                                              Price
                                            </span>
                                            <span className="secondpart">
                                              {item.price} ETH
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </Grid>
                                );
                              } else {
                                if (!isEmpty(item.nft.properties)) {
                                  let filterLength = 0;
                                  item.nft.properties.map(
                                    (propertyItem, propertyKey) => {
                                      filterItemList.map(
                                        (filterItem, filterKey) => {
                                          if (
                                            propertyItem.type ==
                                            filterItem.category
                                          ) {
                                            if (
                                              propertyItem.name ==
                                              filterItem.item
                                            ) {
                                              filterLength++;
                                            }
                                          }
                                        }
                                      );
                                    }
                                  );
                                  if (filterLength == filterItemList.length) {
                                    return (
                                      <Grid
                                        item
                                        xs={
                                          gridmodeflag === 3
                                            ? 3
                                            : gridmodeflag === 4
                                            ? 4
                                            : gridmodeflag === 5
                                            ? 12
                                            : 6
                                        }
                                        key={key}
                                      >
                                        <Link
                                          to={"/detail?item=" + item.nft._id}
                                          className="sliderview"
                                        >
                                          <div className="collectionimage">
                                            <img
                                              src={
                                                ipfs_file_path +
                                                item.nft.attach_file
                                              }
                                              alt="item"
                                            />
                                          </div>
                                          <div className="collectionName">
                                            <h3>{item.nft.title}</h3>
                                          </div>
                                          <div className="relationview">
                                            <div className="view">
                                              <div className="item">
                                                <span className="firstpart">
                                                  Price
                                                </span>
                                                <span className="secondpart">
                                                  {item.price} ETH
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                      </Grid>
                                    );
                                  }
                                }
                              }
                            })}
                        </React.Fragment>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {!isEmpty(result) && result.length > 20 && (
                  <div className="filter-show-more-section">
                    <button
                      type="button"
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
            </div>
          </div>
        </div>
      ) : (
        <div className="activity-section">
          <div className="activity-main">
            <div className="filter-btn-div">
              <button type="button">
                <span>PUNKS COMIC 2 MAIN EDITION</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  width="14"
                  height="14"
                  xlmns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="activity-content">
            <table>
              <thead>
                <tr>
                  <th width="25%">Item</th>
                  <th width="15%">To</th>
                  <th width="20%">Price</th>
                  <th width="10%">Quantity</th>
                  <th width="20%">Time</th>
                  <th width="10%">Type</th>
                </tr>
              </thead>
              <tbody>
                {activitydatas.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td width="25%">
                        <a
                          href="https://etherscan.io/tx/0x6c7bc05e6ca3de74f35812ca3a8e9f34680b73538218ce909d9b6d86c145d235"
                          target="_blank"
                        >
                          <img src={item.src} />
                          <span>{item.name}</span>
                        </a>
                      </td>
                      <td width="15%">
                        {item.address.substring(0, 4)}...
                        {item.address.substring(item.address.length - 4)}
                      </td>
                      <td width="20%">{item.price}</td>
                      <td width="10%">{item.quantity}</td>
                      <td width="20%">{item.time}</td>
                      <td width="10%">{item.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

Exploreitemlist.propTypes = {};

const mapStateToProps = (state) => ({
  collections: state.collections,
});

export default connect(mapStateToProps, {})(Exploreitemlist);
