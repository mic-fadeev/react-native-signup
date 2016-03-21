import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";

import * as constants from "../../lib/constants";
let { SET_PROFILE } = constants.default;

function _setProfile(profile) {
  return {
    type: SET_PROFILE,
    payerid: profile,
  };
}
export function setProfile(profile) {
  return dispatch => {
    if (profile) {
      return AsyncStorage.setItem("payerid", profile)
      .then((Error) => {
        dispatch(_setProfile(profile));
        Actions.Landing();
      });
    }
    return AsyncStorage.getItem("payerid", (error, payerid) => {
      if (payerid) {
        dispatch(_setProfile(payerid));
        Actions.Landing();
      } else {
        Actions.Register();
      }
    });
  };
}