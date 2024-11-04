import { GET_NFT_DATA, GET_SALELISTLOADING_DATA } from "./constants";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../config/config";

// create Sale List Item
export const addSaleListItem = (paramData) => (dispatch) => {
  dispatch(setSaleListLoading(true));

  axios
    .post(apiUrl + "/api/salelists/addsalelistitem", paramData)
    .then((res) => {
      dispatch(setSaleListLoading(false));
      toast.success("Complete Listing!");
    })
    .catch((err) => {
      if (!err.response.data.flag) {
        toast.error(err.response.data.msg);
        dispatch(setSaleListLoading(false));
      } else {
        toast.error("API Network Error!");
        dispatch(setSaleListLoading(false));
      }
    });
};

// Set nft loading variable
export const setSaleListLoading = (flag) => {
  return {
    type: GET_SALELISTLOADING_DATA,
    payload: flag,
  };
};
