const {
  LOGIN_REQUEST,
  CLEAR_AUTH_DATA,
} = require("../../lib/constants").default;


const defaultState = { status: "idle" };

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case CLEAR_AUTH_DATA: {
      return defaultState;
    }
    case LOGIN_REQUEST: {
      return Object.assign({}, state, { status: action.status, err: action.err });
    }
    default:
      return state;
  }
}