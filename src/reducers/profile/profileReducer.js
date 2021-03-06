import * as constants from "../../lib/constants";
let { SET_PROFILE } = constants.default;


export default function profileReducer(state = { profile: {} }, action) {
  switch (action.type) {
    case SET_PROFILE: {
      return Object.assign({}, state, { profile: action.profile });
    }
    default:
      return state;
  }
}
