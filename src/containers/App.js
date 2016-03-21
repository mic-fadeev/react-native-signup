import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Map } from "immutable";

import * as authActions from "../reducers/auth/authActions";
import * as profileActions from "../reducers/profile/profileActions";

import React,
{
  StyleSheet,
  View,
  Text,
  Image,
}
from "react-native";


const actions = [
  authActions,
  profileActions,
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


let styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10,
  },
  summary: {
    fontFamily: "BodoniSvtyTwoITCTT-Book",
    fontSize: 18,
    fontWeight: "bold",
  },
});


let App = React.createClass({
  propTypes() {
    return {
      actions: React.PropTypes.object,
    };
  },

  componentDidMount() {
    this.props.actions.getProfile();
  },

  render() {
    return (
      <View style={ styles.container }>
        <Text>
          Waiting for user data...
        </Text>
      </View>
    );
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(App);

