import * as Redux from "redux";
import React, { Text, View, TouchableHighlight, Image } from "react-native";
import Tcomb from "tcomb-form-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import * as authActions from "../reducers/auth/authActions";

import { Map } from "immutable";

const actions = [
  authActions,
];

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === "function")
          .toObject();

  return {
    actions: Redux.bindActionCreators(creators, dispatch),
    dispatch,
  };
}

let Form = Tcomb.form.Form;

let Email = Tcomb.subtype(Tcomb.Str, (s) => {
  // let re = new RegExp(["^(([^<>()[\]\\.,;:\\s@\"]+(\\.[^<>(),[\]\\.,;:\\s@\"]+)*)",
  //                       "|(\\'.+\\'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.",
  //                       "[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\\.)+",
  //                       "[a-zA-Z]{2,}))$"].jo in(""));
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(s);
});

let LoginModel = Tcomb.struct({
  email: Email,
  password: Tcomb.String,
});

let LoginOptions = {
  fields: {
    email: {
      placeholder: "email",
    },
    password: {
      placeholder: "password",
      type: "password",
      secureTextEntry: true,
    },
  },
};

const Login = React.createClass({
  propTypes: function propTypes() {
    return {
      authorize: React.PropTypes.func,
    };
  },

  componentWillUnmount() {
    this.props.actions.clearAuthData();
  },

  login: function login() {
    let form = this.refs.form.getValue();
    if (form) {
      this.props.actions.login(form);
    }
  },

  register: function register() {
    Actions.Register();
  },

  render: function render() {
    let uri = "http://vignette2.wikia.nocookie.net/nickelodeon/images/4/4a/Paramount_logo.jpg";
    let error;
    let loginButton;
    if (this.props.auth.err) {
      error = (
        <Text style={ { color: "red", fontStyle: "italic" } }>
          User with such credentials doesn't exist.
        </Text>
      );
    }

    if (this.props.auth.status == "start") {
      loginButton = (<Text style={{ fontWeight: "bold", color: "#00c7ba" }}>
        loginning...
      </Text>);
    } else {
      loginButton = (<Text style={{ fontWeight: "bold", color: "#00c7ba" }}>
        Login
      </Text>);
    }

    return (
      <View>
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri }}
        />

        <Form
          ref="form"
          type={LoginModel}
          options={LoginOptions}
        />

        {error}

        <TouchableHighlight onPress={this.login} underlayColor="#99d9f4">
          {loginButton}
        </TouchableHighlight>

        <TouchableHighlight onPress={this.register} underlayColor="#99d9f4">
          <Text style={{ fontWeight: "bold" }}>Create Account</Text>
        </TouchableHighlight>
      </View>
    );
  },
});

function mapStateToProps(state, oldProps) {
  return {
    auth: state.auth,
    profile: state.profile,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);