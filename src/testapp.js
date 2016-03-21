import React, {
  AppRegistry,
} from "react-native";

import RNRF, {
  Route,
} from "react-native-router-flux";

import {
  Provider,
  connect } from "react-redux";

import configureStore from "./lib/configureStore";

import App from "./containers/App";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Landing from "./containers/Profile";
import ForgotPassword from "./containers/ForgotPassword";


export default function native(platform) {
  let MobileApp = React.createClass({
    getInitialState() {
      const store = configureStore();

      const Router = connect()(RNRF.Router);

      return {
        Router,
        store,
      };
    },

    render() {
      let Router = this.state.Router;
      return (
        <Provider store={this.state.store}>
          <Router hideNavBar>
            <Route name="App"
              component={App}
              title="App"
              initial
            />

            <Route name="Login"
              component={Login}
              title="Login"
              type="replace"
            />

            <Route name="Register"
              component={Register}
              title="Register"
              type="replace"
            />

            <Route name="ForgotPassword"
              component={ForgotPassword}
              title="ForgotPassword"
              type="replace"
            />

            <Route name="Landing"
              component={Landing}
              title="Landing"
              type="replace"
            />

          </Router>
        </Provider>
      );
    },
  });

  AppRegistry.registerComponent("testapp", () => MobileApp);
}
