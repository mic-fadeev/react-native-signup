const {
  LOGIN_REQUEST,
} = require("../../lib/constants").default;

import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import { setProfile } from "../profile/profileActions";

let loginStart = () => {
  return {
    type: LOGIN_REQUEST,
    status: "start",
  };
};

let loginEnd = ({ status }) => {
  return {
    type: LOGIN_REQUEST,
    status: "end",
    statusCode: status,
  };
};

export function login({ email, password }) {
  return (dispatch) => {
    dispatch(loginStart());

    return fetch("http://54.186.39.128:5010/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(
      (response) => {
        dispatch(loginEnd(response));
        if (response.status == 200) {
          let json = JSON.parse(response._bodyText)[0];
          return dispatch(setProfile(json.payerid));
        }
      }
    );
  };
}

export function logout() {
  return dispatch => {
    AsyncStorage.removeItem("payerid", (error) => {
      if (!error) {
        Actions.Login();
      }
    });
  };
}

export function register(form) {
  return (dispatch) => {
    dispatch(loginStart());
    return fetch("http://54.186.39.128:5010/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, device_type: 1 }),
    })
    .then(
      (response) => {
        dispatch(loginEnd(response));
        if (response.status == 200) {
          let json = JSON.parse(response._bodyText)[0];
          return dispatch(setProfile(json.payerid));
        }
      }
    );
  };
}