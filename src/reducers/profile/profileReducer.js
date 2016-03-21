import * as constants from "../../lib/constants";
let { SET_PROFILE } = constants.default;


export default function profileReducer(state = {}, action) {
  switch (action.type) {
    case SET_PROFILE: {
      return Object.assign({}, state, { payerid: action.payerid });
    }
    default:
      return state;
  }
}
