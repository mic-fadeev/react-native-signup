import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Map } from "immutable";

import * as authActions from "../reducers/auth/authActions";
import * as profileActions from "../reducers/profile/profileActions";

import * as SplashScreen from "@remobile/react-native-splashscreen";

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
    SplashScreen.hide();
    this.props.actions.setProfile();
  },

  render() {
    return (
      <View style={ styles.container }>
        <Text>
          Waitinig...
        </Text>
        <Image
          style={ { width: 100, height: 100 } }
          source={ { uri: "http://i.imgur.com/da4G0Io.png" } }
        />
      </View>
    );
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(App);

