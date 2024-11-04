import {
  GET_LOADING_DATA,
  GET_AUTHLOADING_DATA,
  GET_NFTLOADING_DATA,
  GET_SALELISTLOADING_DATA,
  GET_DETAILLOADING_DATA,
  GET_BIDLOADING_DATA,
} from "../actions/constants";

const initialState = {
  loading: false,
  authloading: false,
  nftloading: false,
  salelistloading: false,
  detailloading: false,
  bidloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOADING_DATA:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_AUTHLOADING_DATA:
      return {
        ...state,
        authloading: action.payload,
      };
    case GET_NFTLOADING_DATA:
      return {
        ...state,
        nftloading: action.payload,
      };
    case GET_SALELISTLOADING_DATA:
      return {
        ...state,
        salelistloading: action.payload,
      };
    case GET_DETAILLOADING_DATA:
      return {
        ...state,
        detailloading: action.payload,
      };
    case GET_BIDLOADING_DATA:
      return {
        ...state,
        bidloading: action.payload,
      };
    default:
      return state;
  }
}
