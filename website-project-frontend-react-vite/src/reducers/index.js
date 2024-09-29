import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer.js";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

export default rootReducer;
