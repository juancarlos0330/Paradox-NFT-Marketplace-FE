import { GET_BIDLOADING_DATA } from "./constants";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../config/config";

// Buy item with user id and salelist id
export const handleBuyForItem = (paramData) => (dispatch) => {
  dispatch(setBidLoading(true));

  axios
    .post(apiUrl + "/api/bids/buy", paramData)
    .then((res) => {
      dispatch(setBidLoading(false));
      toast.success("Bid success!");
    })
    .catch((err) => {
      if (!err.response.data.flag) {
        toast.error(err.response.data.msg);
        dispatch(setBidLoading(false));
      } else {
        toast.error("API Network Error!");
        dispatch(setBidLoading(false));
      }
    });
};

// Bid item with user id and salelist id
export const handleBidForItem = (paramData) => (dispatch) => {
  dispatch(setBidLoading(true));

  axios
    .post(apiUrl + "/api/bids/bid", paramData)
    .then((res) => {
      dispatch(setBidLoading(false));
      toast.success("Bid success!");
    })
    .catch((err) => {
      if (!err.response.data.flag) {
        toast.error(err.response.data.msg);
        dispatch(setBidLoading(false));
      } else {
        toast.error("API Network Error!");
        dispatch(setBidLoading(false));
      }
    });
};

// Set bid loading variable
export const setBidLoading = (flag) => {
  return {
    type: GET_BIDLOADING_DATA,
    payload: flag,
  };
};
