import * as Redux from "redux";

import thunk from "redux-thunk";

import rootReducer from "../reducers";


export default function configureStore() {
  let store = Redux.createStore(rootReducer, Redux.applyMiddleware(thunk));
  return store;
}
