import { GET_COLLECTION_DATA } from "../actions/constants";

const initialState = {
  collections: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTION_DATA:
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
}
