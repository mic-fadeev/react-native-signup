const {
  LOGIN_REQUEST,
  CLEAR_AUTH_DATA,
} = require("../../lib/constants").default;

import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import { setProfile } from "../profile/profileActions";

import Firebase from "../../lib/Firebase";

let loginStart = () => {
  return {
    type: LOGIN_REQUEST,
    status: "start",
  };
};

let loginEnd = (err) => {
  return {
    type: LOGIN_REQUEST,
    status: "end",
    err: err,
  };
};

export function login({ email, password }) {
  return (dispatch) => {
    dispatch(loginStart());
    return Firebase.authWithPassword({ email, password }, (err, user) => {
      dispatch(loginEnd(err));
      if (user) {
        return dispatch(setProfile(user));
      }
    });
  };
}

export function clearAuthData() {
  return {
    type: CLEAR_AUTH_DATA,
  };
}

export function logout() {
  return dispatch => {
    AsyncStorage.removeItem("token", (error) => {
      if (!error) {
        Actions.Login();
      }
    });
  };
}

export function register(form) {
  return (dispatch) => {
    dispatch(loginStart());
    return Firebase.createUser(form, function (error, user) {
      dispatch(loginEnd(error));
      if (user) {
        return dispatch(login(form));
      }
    });
  };
}