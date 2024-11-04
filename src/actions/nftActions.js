import { GET_NFT_DATA, GET_NFTLOADING_DATA } from "./constants";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../config/config";

// create NFT
export const createNFTData = (paramData) => (dispatch) => {
  dispatch(setNFTLoading(true));

  axios
    .post(apiUrl + "/api/nfts/create", paramData)
    .then((res) => {
      dispatch({
        type: GET_NFT_DATA,
        payload: res.data,
      });
      dispatch(setNFTLoading(false));
      toast.success("New Item Created!");
    })
    .catch((err) => {
      dispatch(setNFTLoading(false));
      toast.error("API Network Error!");
    });
};

// Set nft loading variable
export const setNFTLoading = (flag) => {
  return {
    type: GET_NFTLOADING_DATA,
    payload: flag,
  };
};
