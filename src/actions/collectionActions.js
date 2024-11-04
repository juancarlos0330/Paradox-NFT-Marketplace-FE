import { GET_COLLECTION_DATA, GET_LOADING_DATA } from "./constants";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../config/config";

// get all collections data from opensea
export const getCollectionDataFromOpensea = () => (dispatch) => {
  dispatch(setLoading(true));

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "c5c47412a6a54287a599a72dfa365094",
    },
  };

  fetch("https://api.opensea.io/api/v1/collections?offset=0&limit=300", options)
    .then((response) => response.json())
    .then((response) => {
      const results = response.collections.filter((item) => {
        return item.image_url != null;
      });

      dispatch({
        type: GET_COLLECTION_DATA,
        payload: results,
      });

      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      toast.error("Network Error!");
    });
};

// Get collection data with auctioned and saled
export const getCollectionData = () => (dispatch) => {
  dispatch(setLoading(true));

  axios
    .get(apiUrl + "/api/collections/all")
    .then((res) => {
      dispatch({
        type: GET_COLLECTION_DATA,
        payload: Array.from(
          new Set(
            res.data
              .map((item, key) => {
                return item.nft.collections;
              })
              .map((obj) => JSON.stringify(obj))
          )
        ).map((str) => JSON.parse(str)),
      });

      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      toast.error("Network Error!");
    });
};

// create collection
export const createCollectionData = (paramData) => (dispatch) => {
  dispatch(setLoading(true));

  axios
    .post(apiUrl + "/api/collections/create", paramData)
    .then((res) => {
      dispatch(setLoading(false));
      dispatch(getCollectionData());
      toast.success("New Collection Created!");
    })
    .catch((err) => {
      dispatch(setLoading(false));
      toast.error("API Network Error!");
    });
};

// Set loading variable
export const setLoading = (flag) => {
  return {
    type: GET_LOADING_DATA,
    payload: flag,
  };
};
