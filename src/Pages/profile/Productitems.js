import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { apiUrl, ipfs_file_path, siteFeeAmount } from "../../config/config";
import { toast } from "react-toastify";
import { handleNFTLoading } from "../../actions/loadingActions";
import { addSaleListItem } from "../../actions/salelistActions";
import isEmpty from "../../validations/is-empty";
import CountDownDate from "../itemdetail/CountDownDate";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Productitems = (props) => {
  const [category, setCategory] = useState("myitem");
  const [myItems, setMyItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [activeBidItems, setActiveBidItems] = useState([]);
  const [convert_ETHToUSD_Price, setConvert_ETHToUSD_Price] = useState(0);
  const [currentDateFromAPI, setCurrentDateFromAPI] = useState("");

  // for list sale modal
  const [saleModalFlag, setSaleModalFlag] = useState(false);
  const [saleModalItem, setSaleModalItem] = useState({});
  const [saleType, setSaleType] = useState(1);
  const [saleItemPrice, setSaleItemPrice] = useState(0);
  const [saleDuration, setSaleDuration] = useState("1hour");

  const getMyItems = () => {
    axios
      .post(apiUrl + "/api/nfts/getNFTItemByUserID", {
        userid: props.auth.user.id,
      })
      .then((res) => {
        setMyItems(res.data);

        axios
          .post(apiUrl + "/api/salelists/getItemByUserID", {
            userid: props.auth.user.id,
          })
          .then((activeRes) => {
            console.log(activeRes.data.salelists);
            setActiveItems(
              isEmpty(activeRes.data.salelists) ? [] : activeRes.data.salelists
            );
            setCurrentDateFromAPI(activeRes.data.currentDate);

            axios
              .post(apiUrl + "/api/bids/getBidsByUserID", {
                userid: props.auth.user.id,
              })
              .then((activeBids) => {
                setActiveBidItems(activeBids.data);
                props.handleNFTLoading(false);
              })
              .catch((err) => {
                toast.error("API Network Error!");
                props.handleNFTLoading(false);
              });
          })
          .catch((err) => {
            toast.error("API Network Error!");
            props.handleNFTLoading(false);
          });
      })
      .catch((err) => {
        toast.error("API Network Error!");
        props.handleNFTLoading(false);
      });
  };

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.handleNFTLoading(true);
      getMyItems();
    }
  }, [props.auth]);

  const handleSaleSave = async () => {
    if (Number(saleItemPrice) === 0) {
      toast.error("Please set a price!");
      setSaleModalFlag(true);
    } else {
      const paramData = {
        sale_type: saleType,
        price: saleItemPrice,
        duration: saleDuration,
        collectionid: saleModalItem.collections,
        nftid: saleModalItem._id,
        userid: props.auth.user.id,
      };

      await props.addSaleListItem(paramData);
      await getMyItems();
      await setSaleModalFlag(false);
    }
  };

  const handleSaleCancel = () => {
    setSaleModalFlag(false);
  };

  const handleListForSale = (item) => {
    if (isEmpty(item)) {
      toast.warning("Oops! You can't load this item because something error!");
      setSaleModalFlag(false);
    } else {
      setSaleModalFlag(true);
      setSaleModalItem(item);
      setSaleType(1);
      setSaleItemPrice(0);
    }
  };

  useEffect(() => {
    fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
      .then((response) => response.json())
      .then((data) => setConvert_ETHToUSD_Price(data.USD));
  }, [saleItemPrice]);

  return (
    <div className="product-item-view">
      <div className="product-category-view">
        <div className="product-filter-view">
          <button
            type="button"
            className={category === "myitem" ? "active" : ""}
            onClick={() => setCategory("myitem")}
          >
            MY items
          </button>
          <button
            type="button"
            className={category === "activeitem" ? "active" : ""}
            onClick={() => setCategory("activeitem")}
          >
            Active listings
          </button>
          <button
            type="button"
            className={category === "activebid" ? "active" : ""}
            onClick={() => setCategory("activebid")}
          >
            Active bids
          </button>
        </div>
        <button className="product-sort-view">
          <svg
            viewBox="0 0 16 14"
            fill="none"
            width="14"
            height="14"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.53033 5.03033C9.23744 5.32322 8.76256 5.32322 8.46967 5.03033C8.17678 4.73744 8.17678 4.26256 8.46967 3.96967L11.4697 0.96967C11.6155 0.823795 11.8066 0.750573 11.9978 0.750003C11.9985 0.750001 11.9993 0.75 12 0.75C12.0008 0.75 12.0015 0.750001 12.0022 0.750003C12.1031 0.750299 12.1993 0.77051 12.2871 0.806909C12.3755 0.843509 12.4584 0.897763 12.5303 0.96967L15.5303 3.96967C15.8232 4.26256 15.8232 4.73744 15.5303 5.03033C15.2374 5.32322 14.7626 5.32322 14.4697 5.03033L12.75 3.31066L12.75 12.5C12.75 12.9142 12.4142 13.25 12 13.25C11.5858 13.25 11.25 12.9142 11.25 12.5L11.25 3.31066L9.53033 5.03033ZM1.53033 8.96967C1.23744 8.67678 0.762563 8.67678 0.46967 8.96967C0.176777 9.26256 0.176777 9.73744 0.46967 10.0303L3.46967 13.0303C3.54158 13.1022 3.62445 13.1565 3.71291 13.1931C3.80134 13.2298 3.89831 13.25 4 13.25C4.19194 13.25 4.38388 13.1768 4.53033 13.0303L7.53033 10.0303C7.82322 9.73744 7.82322 9.26256 7.53033 8.96967C7.23744 8.67678 6.76256 8.67678 6.46967 8.96967L4.75 10.6893L4.75 1.5C4.75 1.08579 4.41421 0.75 4 0.75C3.58579 0.75 3.25 1.08579 3.25 1.5L3.25 10.6893L1.53033 8.96967Z"
              fill="currentColor"
            ></path>
          </svg>
          <span>Recently listed</span>
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
      <div className="product-result">
        {category === "myitem" ? (
          isEmpty(myItems) ? (
            <div className="empty-section">No Items</div>
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
              {myItems.map((item, key) => {
                if (
                  isEmpty(
                    activeItems.filter((filteritem) => {
                      return filteritem._id === item._id;
                    })
                  )
                ) {
                  return (
                    <SwiperSlide key={key}>
                      <Link
                        to={"/detail?item=" + item._id}
                        className="sliderview"
                      >
                        <div className="collectionimage">
                          <img
                            src={ipfs_file_path + item.attach_file}
                            alt="image"
                          />
                        </div>
                        <div className="collectionName">
                          <h3>{item.title}</h3>
                        </div>
                        <div className="relationview">
                          <div className="saleview">
                            <div className="item">
                              <button
                                type="button"
                                className="sale-btn"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleListForSale(item);
                                }}
                                disabled={
                                  !isEmpty(
                                    activeItems.filter((filteritem) => {
                                      return filteritem.nft._id === item._id;
                                    })
                                  )
                                }
                              >
                                List For Sale
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          )
        ) : category === "activeitem" ? (
          isEmpty(activeItems) ? (
            <div className="empty-section">No Active Items</div>
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
              {activeItems.map((item, key) => {
                return (
                  <SwiperSlide key={key}>
                    <Link
                      to={"/detail?item=" + item.nft._id}
                      className="sliderview"
                    >
                      <div className="collectionimage">
                        <img
                          src={ipfs_file_path + item.nft.attach_file}
                          alt="active item image"
                        />
                      </div>
                      <div className="collectionName">
                        <h3>{item.nft.title}</h3>
                      </div>
                      <div className="relationview">
                        <div className="view">
                          <div className="item">
                            <span className="firstpart">
                              {item.sale_type === 2 ? "Initial Price" : "Price"}
                            </span>
                            <span className="secondpart">{item.price} ETH</span>
                          </div>
                          {item.sale_type === 2 && (
                            <div className="item">
                              <span className="firstpart">Remaining Time</span>
                              <span className="secondpart">
                                <CountDownDate
                                  currentDate={currentDateFromAPI}
                                  expiredDate={item.expired_time}
                                />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )
        ) : isEmpty(activeBidItems) ? (
          <div className="empty-section">No Bids</div>
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
            {activeBidItems.map((item, key) => {
              return (
                <SwiperSlide key={key}>
                  <Link
                    to={"/detail?item=" + item.salelist.nft._id}
                    className="sliderview"
                  >
                    <div className="collectionimage">
                      <img
                        src={ipfs_file_path + item.salelist.nft.attach_file}
                        alt="bid item image"
                      />
                    </div>
                    <div className="collectionName">
                      <h3>{item.salelist.nft.title}</h3>
                    </div>
                    <div className="relationview">
                      <div className="view">
                        <div className="item">
                          <span className="firstpart">Your Bid Amount</span>
                          <span className="secondpart">
                            {item.bidamount} ETH
                          </span>
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
      <Modal
        title={[
          <p key="back" style={{ fontSize: 24, fontWeight: "bolder" }}>
            List for sale
          </p>,
        ]}
        centered
        className="list-for-sale-modal"
        open={saleModalFlag}
        onOk={handleSaleSave}
        onCancel={handleSaleCancel}
        width={1000}
        footer={[
          <button
            key="back"
            className="footer-btn"
            type="button"
            onClick={handleSaleSave}
            disabled={props.loading.salelistloading}
          >
            Complete listing
          </button>,
        ]}
      >
        {!isEmpty(saleModalItem) ? (
          <div className="list-for-sale-view">
            <div className="list-sale-content">
              <div className="type-of-sale">
                <p className="title">Choose a type of sale</p>
                <div
                  className={
                    saleType === 1
                      ? "sale-type-view saleactive"
                      : "sale-type-view"
                  }
                  onClick={() => setSaleType(1)}
                >
                  <div className="sale-type-desc">
                    <p>Fixed Price</p>
                    <p>The item is listed at the price you set.</p>
                  </div>
                  <div className="sale-type-selection">
                    <div
                      className={
                        saleType === 1
                          ? "sale-type-circle active"
                          : "sale-type-circle"
                      }
                    >
                      <div className="sale-type-dot"></div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    saleType === 2
                      ? "sale-type-view saleactive"
                      : "sale-type-view"
                  }
                  onClick={() => setSaleType(2)}
                >
                  <div className="sale-type-desc">
                    <p>Timed auction</p>
                    <p>The item is listed for auction.</p>
                  </div>
                  <div className="sale-type-selection">
                    <div
                      className={
                        saleType === 2
                          ? "sale-type-circle active"
                          : "sale-type-circle"
                      }
                    >
                      <div className="sale-type-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
              {saleType === 1 ? (
                <div className="type-of-sale">
                  <p className="title">Set a price</p>
                  <div
                    className="set-price-view"
                    onClick={() => setSaleItemPrice(0.0005)}
                  >
                    <p>Floor</p>
                    <p>0.0005 ETH</p>
                  </div>
                  <div className="set-price-input-view">
                    <input
                      type="number"
                      placeholder="Amount"
                      className="price-input"
                      value={saleItemPrice}
                      onChange={(e) => setSaleItemPrice(e.target.value)}
                    />
                    <div className="coin-type">ETH</div>
                  </div>
                  <div className="type-of-sale-convert-price">
                    {!isEmpty(saleItemPrice) &&
                      Number(saleItemPrice) !== 0 &&
                      "$" +
                        Number(saleItemPrice * convert_ETHToUSD_Price).toFixed(
                          2
                        ) +
                        " Total"}
                  </div>
                </div>
              ) : (
                <>
                  <div className="type-of-sale">
                    <p className="title">Set a price</p>
                    <div
                      className="set-price-view"
                      onClick={() => setSaleItemPrice(0.0005)}
                    >
                      <p>Floor</p>
                      <p>0.0005 ETH</p>
                    </div>
                    <div className="set-starting-price">Starting price</div>
                    <div className="set-price-input-view">
                      <input
                        type="number"
                        placeholder="Amount"
                        className="price-input"
                        value={saleItemPrice}
                        onChange={(e) => setSaleItemPrice(e.target.value)}
                      />
                      <div className="coin-type">ETH</div>
                    </div>
                    <div className="type-of-sale-convert-price">
                      {!isEmpty(saleItemPrice) &&
                        Number(saleItemPrice) !== 0 &&
                        "$" +
                          Number(
                            saleItemPrice * convert_ETHToUSD_Price
                          ).toFixed(2) +
                          " Total"}
                    </div>
                  </div>
                  <div className="type-of-sale">
                    <p className="title">Duration</p>
                    <div className="type-of-sale-duration-section">
                      <select
                        value={saleDuration}
                        onChange={(e) => setSaleDuration(e.target.value)}
                      >
                        <option value="1hours">1 hour</option>
                        <option value="6hours">6 hours</option>
                        <option value="1days">1 day</option>
                        <option value="3days">3 days</option>
                        <option value="7days">7 days</option>
                        <option value="1months">1 month</option>
                        <option value="3months">3 months</option>
                        <option value="6months">6 months</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="type-of-sale">
                <p className="title">Summary</p>
                <div className="summary-price-section">
                  <div className="summary-price-title">
                    <p>Listing price</p>
                  </div>
                  <div className="summary-price-pricing">
                    <p>{saleItemPrice} ETH</p>
                  </div>
                </div>
                <div className="summary-fee-section">
                  <div className="summary-fee-title">
                    <p>Marketplace fee</p>
                    <p>Total potential earnings</p>
                  </div>
                  <div className="summary-fee-pricing">
                    <p>{siteFeeAmount}%</p>
                    <p>
                      {Number(
                        Number(
                          Number(saleItemPrice) +
                            Number(saleItemPrice / 100) * siteFeeAmount
                        ).toFixed(4)
                      )}{" "}
                      ETH
                    </p>
                    <p>
                      {!isEmpty(saleItemPrice) &&
                        "≈ $" +
                          Number(
                            Number(
                              Number(saleItemPrice) +
                                Number(saleItemPrice / 100) * siteFeeAmount
                            ) * convert_ETHToUSD_Price
                          ).toFixed(2) +
                          " USD"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-item-preview">
              <div className="item-preview-section">
                <div className="item-preview-image">
                  <img
                    src={ipfs_file_path + saleModalItem.attach_file}
                    alt="item image"
                  />
                </div>
                <div className="item-preview-footer">
                  <p className="item-preview-footer-title">
                    {saleModalItem.title}
                  </p>
                  <p className="item-preview-footer-desc">
                    {saleModalItem.description}
                  </p>
                  <p className="item-preview-price">
                    {Number(saleItemPrice) === 0 || isEmpty(saleItemPrice)
                      ? "---"
                      : saleItemPrice}{" "}
                    ETH
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};

Productitems.propTypes = {
  handleNFTLoading: PropTypes.func.isRequired,
  addSaleListItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.loading,
});

export default connect(mapStateToProps, { handleNFTLoading, addSaleListItem })(
  Productitems
);
