import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";

import * as constants from "../../lib/constants";
let { SET_PROFILE } = constants.default;
import Firebase from "../../lib/Firebase";


function _setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile,
  };
}

export function setProfile(profile) {
  return dispatch => {
    return AsyncStorage.setItem("token", profile.token)
    .then((Error) => {
      console.log(Error);
      dispatch(_setProfile(profile));
      Actions.Landing();
    });
  };
}

export function getProfile() {
  return dispatch => {
    return AsyncStorage.getItem("token", (error, _token) => {
      if (_token) {
        Firebase.authWithCustomToken(_token, (error, authData) => {
          dispatch(setProfile(authData));
          return Actions.Landing();
        });
      } else {
        Actions.Register();
      }
    });
  }
}