import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import statusReducer from "./statusReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  status: statusReducer
});
