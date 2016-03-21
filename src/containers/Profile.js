import { bindActionCreators } from "redux";
import { connect } from "react-redux";


import * as authActions from "../reducers/auth/authActions";
import * as profileActions from "../reducers/profile/profileActions";

import { Map } from "immutable";

// import ItemCheckbox from "../components/ItemCheckbox";

import React,
{
  // StyleSheet,
  View,
  Text,
  TouchableHighlight,
}
from "react-native";


const actions = [
  profileActions,
  authActions,
];

function mapStateToProps(state) {
  return {
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

const Profile = React.createClass({
  propTypes() {
    return {
      profile: React.PropTypes.object,
    };
  },

  render: function render() {
    console.log(this.props.profile);
    return (
      <View>
        <TouchableHighlight onPress={this.props.actions.logout} underlayColor="#99d9f4">
          <Text style={{ fontWeight: "bold" }}>Logout</Text>
        </TouchableHighlight>
        <Text>
          Well hello there, user with id {this.props.profile.profile.uid}!
        </Text>
      </View>
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
