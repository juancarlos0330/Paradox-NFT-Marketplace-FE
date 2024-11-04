import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import collectionsReducer from "./reducers/collectionsReducer";
import thememodeReducer from "./reducers/thememodeReducer";
import loadingReducer from "./reducers/loadingReducer";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  auth: authReducer,
  collections: collectionsReducer,
  thememode: thememodeReducer,
  loading: loadingReducer,
});

const configureStore = () => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
};

export default configureStore;
