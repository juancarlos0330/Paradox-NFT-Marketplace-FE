import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ethers } from "ethers";
import logo from "../assets/image/logo.png";
import punkslogo from "../assets/image/punkslogo.png";
import inhabitantslogo from "../assets/image/inhabitantslogo.png";
import { setThemeMode } from "../actions/themeActions";
import { handleAuthLoading } from "../actions/loadingActions";
import { signUser, logoutUser } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/header.scss";

const punkdatas = [
  {
    id: 1,
    title: "PUNKS Comic Issue 1",
    src: require("../assets/image/slider1.png"),
  },
  {
    id: 2,
    title: "PUNKS Comic Issue 2",
    src: require("../assets/image/slider2.png"),
  },
  {
    id: 3,
    title: "PUNKS Comic Issue 3",
    src: require("../assets/image/slider3.png"),
  },
  {
    id: 4,
    title: "Origin Stories",
    src: require("../assets/image/slider4.png"),
  },
];

const inhabitantdatas = [
  {
    id: 1,
    title: "Inhabitants: Generative Identities",
    value: "0.5 ETH",
    src: require("../assets/image/image1.png"),
  },
  {
    id: 2,
    title: "Inhabitants: DOTs",
    value: "0.041 ETH",
    src: require("../assets/image/image2.png"),
  },
  {
    id: 3,
    title: "Inhabitants: United Planets",
    value: "",
    src: require("../assets/image/image3.png"),
  },
  {
    id: 4,
    title: "Inhabitants: Stories",
    value: "0.04 ETH",
    src: require("../assets/image/image4.png"),
  },
  {
    id: 5,
    title: "Gear Pods",
    value: "0.018 ETH",
    src: require("../assets/image/image5.png"),
  },
];

const Header = (props) => {
  const navigate = useNavigate();
  const [profileflag, setProfileflag] = useState(false);
  const [themeflag, setThemeflag] = useState(false);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  useEffect(() => {
    const modal = document.getElementById("backgroundformodal");
    setThemeflag(localStorage.getItem("themeMode") === "dark" ? true : false);
    props.setThemeMode(localStorage.getItem("themeMode"));
    window.onclick = function (event) {
      if (event.target == modal) {
        props.setflag(false);
        setProfileflag(false);
        props.setproflag(false);
      }
    };

    if (props.auth.isAuthenticated === true) {
      onWalletConnect();
    }
  }, []);

  const profilefunc = (flag) => {
    props.setproflag(flag);
    setProfileflag(flag);
  };

  const disconnectfunc = async () => {
    props.handleAuthLoading(true);
    profilefunc(false);
    await props.logoutUser();
    setConnButtonText("Connect Wallet");
    props.handleAuthLoading(false);
    navigate("/");
  };

  const modeChange = (e) => {
    localStorage.setItem("themeMode", themeflag ? "light" : "dark");
    props.setThemeMode(themeflag ? "light" : "dark");
    setThemeflag(!themeflag);
    document
      .getElementById("lightlink")
      .setAttribute(
        "href",
        themeflag ? "/assets/css/light.css" : "/assets/css/dark.css"
      );
  };

  const onWalletConnect = async () => {
    props.handleAuthLoading(true);
    if (window.ethereum) {
      window.web3 = new ethers.providers.Web3Provider(window.ethereum);
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId != "0x1") {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          });
          props.handleAuthLoading(false);
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code == 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x1",
                    rpcUrl:
                      "https://mainnet.infura.io/v3/9f65f2e7dc324b6fba99c874cecfbadd",
                    // "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
                  },
                ],
              });
              props.handleAuthLoading(false);
            } catch (addError) {
              props.handleAuthLoading(false);
            }
          } else {
            props.handleAuthLoading(false);
          }
          // handle other "switch" errors
        }

        window.ethereum.on("chainChanged", handleChainChanged);
        function handleChainChanged(_chainId) {
          // We recommend reloading the page, unless you must do otherwise
          window.location.reload();
        }
      }

      await window.ethereum
        .enable()
        .then((result) => {
          var account = result[0];
          if (typeof result != "undefined" && result.length > 0) {
            var start5 = account.substring(0, 5);
            var middle5 = ".....";
            var last5 = account.substring(37, 42);
            var joined = start5 + middle5 + last5;
            setConnButtonText(joined);
            props.signUser({ address: account });
            props.handleAuthLoading(false);
          } else {
            props.handleAuthLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          props.handleAuthLoading(false);
        });
    } else if (window.web3) {
      window.web3 = new ethers.providers.Web3Provider(window.ethereum);
      new ethers.providers.Web3Provider(window.ethereum).providers.HttpProvider(
        "https://mainnet.infura.io/v3/9f65f2e7dc324b6fba99c874cecfbadd"
        // "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      );
      props.handleAuthLoading(false);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      props.handleAuthLoading(false);
    }
    // getbearxofwallet();
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="lsection">
          <Link to="/">
            <img src={logo} />
          </Link>
          <div className="dropmenu">
            <button
              type="button"
              onClick={() => props.setflag(!props.dropflag)}
            >
              <div>
                <span>Explore</span>
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
                    d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
            <div className={props.dropflag ? "dropdownview" : "dropdownviewno"}>
              <div className="menu-section">
                <div className="title">
                  <img src={punkslogo} />
                  <Link to="/section">View All</Link>
                </div>
                {punkdatas.map((item, key) => {
                  return (
                    <Link to="/section" className="items" key={key}>
                      <div className="imgdiv">
                        <img src={item.src} />
                      </div>
                      <div className="contentdiv">
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  );
                })}
                <div className="border-stick"></div>
              </div>
              <div className="menu-section">
                <div className="title">
                  <img src={inhabitantslogo} />
                  <Link to="/section">View All</Link>
                </div>
                {inhabitantdatas.map((item, key) => {
                  return (
                    <Link to="/explore" className="items" key={key}>
                      <div className="imgdiv">
                        <img src={item.src} />
                      </div>
                      <div className="contentdiv">
                        <span>{item.title}</span>
                        <span>{item.value}</span>
                      </div>
                    </Link>
                  );
                })}
                <div className="border-stick"></div>
              </div>

              <div className="menu-section">
                <div className="title">
                  <span className="subtitle">Core Collection</span>
                </div>
                <Link className="items">
                  <div className="imgdiv">
                    <img src={require("../assets/image/collectionitem.png")} />
                  </div>
                  <div className="contentdiv">
                    <span>Pixel Vault Core Collection</span>
                    <span>15.99 ETH</span>
                  </div>
                </Link>
                <div className="border-stick"></div>
              </div>

              <div className="menu-section">
                <div className="title">
                  <span className="subtitle">Founder's DAO</span>
                </div>
                <Link className="items">
                  <div className="imgdiv">
                    <img src={require("../assets/image/image2.png")} />
                  </div>
                  <div className="contentdiv">
                    <span>Pixel Vault Founder's DAO</span>
                    <span>0.22 ETH</span>
                  </div>
                </Link>
                <div className="border-stick"></div>
              </div>

              <div className="menu-section">
                <div className="title">
                  <span className="subtitle">Community Drops</span>
                </div>
                <Link className="items">
                  <div className="imgdiv">
                    <img src={require("../assets/image/image4.png")} />
                  </div>
                  <div className="contentdiv">
                    <span>Ape Madness</span>
                    <span>0.069 ETH</span>
                  </div>
                </Link>
                <Link className="items">
                  <div className="imgdiv">
                    <img src={require("../assets/image/image5.png")} />
                  </div>
                  <div className="contentdiv">
                    <span>Heroes Follow Heroes</span>
                    <span>0.01 ETH</span>
                  </div>
                </Link>
                <div className="border-stick"></div>
              </div>
            </div>
          </div>
          <div className="dark-light-mode">
            <label className="light-text">Light</label>
            <div className="mode-main">
              <label className="switch">
                <input
                  type="checkbox"
                  name="cssmodeflag"
                  className="cssmodeflag"
                  id="cssmodeflag"
                  onChange={modeChange}
                  checked={themeflag}
                />
                <span className="slider-round"></span>
              </label>
            </div>
            <label className="dark-text">Dark</label>
          </div>
        </div>
        <div className="rsection">
          {props.auth.isAuthenticated ? (
            <div className="profile">
              <button
                type="button"
                className="profile-avatar"
                onClick={() => profilefunc(true)}
              >
                <img
                  className="avatar"
                  alt="avatar"
                  src={props.auth.user.avatar}
                />
              </button>
              {profileflag ? (
                <div className="profile-menu">
                  <div className="profile-main">
                    <div className="main-net">
                      <span className="main-net-name">Mainnet (ETHEREUM)</span>
                      <span className="main-net-address">{connButtonText}</span>
                    </div>
                    <Link
                      to="/profile"
                      rel="noopener noreferrer"
                      className="support"
                    >
                      <div>My items</div>
                    </Link>
                    <Link
                      to="/create"
                      rel="noopener noreferrer"
                      className="creation"
                    >
                      <div>Create</div>
                    </Link>
                    <Link
                      to="/contact"
                      rel="noopener noreferrer"
                      className="support"
                    >
                      <div>support</div>
                    </Link>
                    <button
                      type="button"
                      className="my-items"
                      onClick={() => disconnectfunc()}
                    >
                      <div>Disconnect</div>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <button
              type="button"
              className="connect-wallet-button"
              onClick={() => onWalletConnect()}
            >
              {connButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  setThemeMode: PropTypes.func.isRequired,
  signUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  handleAuthLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  thememode: state.thememode,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setThemeMode,
  signUser,
  logoutUser,
  handleAuthLoading,
})(Header);
