import auth from "./auth/authReducer";
import profile from "./profile/profileReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: auth,
  profile: profile,
});

export default rootReducer;
