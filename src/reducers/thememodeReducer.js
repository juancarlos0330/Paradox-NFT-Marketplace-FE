import { GET_THEME_MODE } from "../actions/constants";

const initialState = {
  thememode: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_THEME_MODE:
      return {
        ...state,
        thememode: action.payload,
      };
    default:
      return state;
  }
}
