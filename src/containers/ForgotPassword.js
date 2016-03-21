import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as authActions from "../reducers/auth/authActions";

import { Map } from "immutable";

import React from "react-native";

const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
} = require("../lib/constants").default;

const actions = [
  authActions,
];

function mapStateToProps(state) {
  return {
    ...state,
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === "function")
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  };
}

let ForgotPassword = React.createClass({

  render() {
    return(
      <View>
        <Text>
          Hello there, handsome!
        </Text>
      </View>
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
