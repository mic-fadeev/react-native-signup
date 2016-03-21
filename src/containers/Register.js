import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as authActions from "../reducers/auth/authActions";

import { Map } from "immutable";

import { Actions } from "react-native-router-flux";

import React, { Text, View, TouchableHighlight } from "react-native";

import RegisterForm from "../components/RegisterStepOneForm";

const actions = [
  authActions,
];

function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile,
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

let Register = React.createClass({
  propTypes: function propTypes() {
    return {
      authorize: React.PropTypes.func,
    };
  },

  getInitialState() {
    return {
      step: 1,
      form: {},
    };
  },

  cancel() {
    Actions.Login();
  },

  register() {
    let form = this.refs.registerForm.refs.form.getValue();
    form && this.props.actions.register(form);
  },

  render() {
    let error;

    if (this.props.auth.err) {
      error = (
        <Text style={ { color: "red", fontStyle: "italic" } }>
          User with this email already exists.
        </Text>
      );
    }

    return (
      <View>
        <TouchableHighlight onPress={this.cancel} underlayColor="#99d9f4">
          <Text style={{ fontWeight: "bold" }}>Cancel</Text>
        </TouchableHighlight>

        <RegisterForm ref="registerForm" />

        {error}

        <TouchableHighlight onPress={this.register} underlayColor="#99d9f4">
          <Text style={{ fontWeight: "bold", color: "#00c7ba" }}>Register</Text>
        </TouchableHighlight>

      </View>
    );
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
