import { combineReducers } from "redux";
import authenticationSlice from "../slices/authenticationSlice";

const rootReducer = combineReducers({
  authentication: authenticationSlice,
});

export default rootReducer;
