import {
  GET_AUTHLOADING_DATA,
  GET_LOADING_DATA,
  GET_NFTLOADING_DATA,
  GET_DETAILLOADING_DATA,
  GET_BIDLOADING_DATA,
} from "./constants";

// handle loading variable
export const handleLoading = (flag) => (dispatch) => {
  dispatch({
    type: GET_LOADING_DATA,
    payload: flag,
  });
};

// handle auth loading variable
export const handleAuthLoading = (flag) => (dispatch) => {
  dispatch({
    type: GET_AUTHLOADING_DATA,
    payload: flag,
  });
};

// handle nft loading variable
export const handleNFTLoading = (flag) => (dispatch) => {
  dispatch({
    type: GET_NFTLOADING_DATA,
    payload: flag,
  });
};

// handle detail loading variable
export const handleDetailLoading = (flag) => (dispatch) => {
  dispatch({
    type: GET_DETAILLOADING_DATA,
    payload: flag,
  });
};

// handle bid loading variable
export const handleBidLoading = (flag) => (dispatch) => {
  dispatch({
    type: GET_BIDLOADING_DATA,
    payload: flag,
  });
};
