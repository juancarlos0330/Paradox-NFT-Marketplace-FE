import { GET_THEME_MODE } from "./constants";

// set themeMode | dark and light
export const setThemeMode = (themeMode) => (dispatch) => {
  dispatch({
    type: GET_THEME_MODE,
    payload: themeMode,
  });
};
