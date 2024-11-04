import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import subAddress from "../../utils/subAddress";

const Address = (props) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [isCopyTextFlag, setIsCopyTextFlag] = useState(false);

  const copyAddress = (address) => {
    const textToCopy = address;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopyTextFlag(true);
        setTimeout(() => {
          setIsCopyTextFlag(false);
        }, 1000);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="profile-address-view">
      <img src={props.auth.user.avatar} alt="avatar" />
      <div className="profile-address-info">
        <h2 className="address">
          {props.auth.isAuthenticated
            ? subAddress(props.auth.user.address)
            : ""}
        </h2>
        <button
          type="button"
          className="copy-address-button"
          onClick={() => copyAddress(props.auth.user.address)}
        >
          <div className="copy-address">
            {props.auth.isAuthenticated
              ? subAddress(props.auth.user.address)
              : ""}
          </div>
          <div className="copy-icon">
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              xlmns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.75 2C3.67893 2 2 3.67893 2 5.75V7.67348C2 9.39346 3.1723 10.8396 4.76147 11.2566C5.20016 12.8406 6.65217 14.0034 8.37578 14.0034H10.2535C12.3245 14.0034 14.0035 12.3245 14.0035 10.2534V8.37579C14.0035 6.65219 12.8406 5.20019 11.2567 4.76149C10.8397 3.17231 9.39356 2 7.67357 2H5.75ZM9.59635 4.62579C9.21874 3.95391 8.49916 3.5 7.67357 3.5H5.75C4.50736 3.5 3.5 4.50736 3.5 5.75V7.67348C3.5 8.49907 3.95391 9.21864 4.62578 9.59625V8.37579C4.62578 6.30472 6.30471 4.62579 8.37578 4.62579H9.59635ZM6.12578 8.37579C6.12578 7.13315 7.13314 6.12579 8.37578 6.12579H10.2535C11.4961 6.12579 12.5035 7.13315 12.5035 8.37579V10.2534C12.5035 11.496 11.4961 12.5034 10.2535 12.5034H8.37578C7.13314 12.5034 6.12578 11.496 6.12578 10.2534V8.37579Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div
            className="copy-text-animation"
            style={{ opacity: isCopyTextFlag ? 1 : 0 }}
          >
            Copied
          </div>
        </button>

        <div>
          Joined{" "}
          {props.auth.isAuthenticated
            ? monthNames[new Date(props.auth.user.created_at).getMonth()] +
              " " +
              new Date(props.auth.user.created_at).getFullYear()
            : new Date().getMonth() + new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

Address.propTypes = {};

const mapStateToProps = (state) => ({
  thememode: state.thememode,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Address);
