const {
  LOGIN_REQUEST,
} = require("../../lib/constants").default;


const defaultState = { status: "idle" };

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case "BEFORE_ROUTER_ROUTE": {
      if (action.name == "Register") {
        return defaultState;
      }
      return state;
    }
    case LOGIN_REQUEST: {
      return Object.assign({}, state, { status: action.status, statusCode: action.statusCode });
    }
    default:
      return state;
  }
}