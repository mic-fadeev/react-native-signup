import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as authActions from "../reducers/auth/authActions";

import { Map } from "immutable";

import { Actions } from "react-native-router-flux";

import React, { Text, View, TouchableHighlight } from "react-native";

import RegisterStepOneForm from "../components/RegisterStepOneForm";
import RegisterStepTwoForm from "../components/RegisterStepTwoForm";
import RegisterStepThreeForm from "../components/RegisterStepThreeForm";

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

  completeStep() {
    let form = this.refs.currentStep.refs.form.getValue();
    if (form) {
      form = Object.assign(this.state.form, form);
      if (this.state.step != 3) {
        this.setState({
          form,
          step: ++this.state.step,
        });
      } else {
        this.props.actions.register(form);
      }
    }
  },

  render() {
    let CurrentStep;
    let error;

    if (this.props.auth.statusCode == 403) {
      error = (<Text style={ { color: "red", fontStyle: "italic" } }>
          user doesn't exist
        </Text>);
    }

    switch (this.state.step) {
      case 1: {
        CurrentStep = RegisterStepOneForm;
        break;
      }
      case 2: {
        CurrentStep = RegisterStepTwoForm;
        break;
      }
      case 3: {
        CurrentStep = RegisterStepThreeForm;
        break;
      }
      default:
        break;
    }

    return (
      <View>
        <TouchableHighlight onPress={this.cancel} underlayColor="#99d9f4">
          <Text style={{ fontWeight: "bold" }}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.completeStep} underlayColor="#99d9f4">
          <Text style={{ fontWeight: "bold", color: "#00c7ba" }}>Next</Text>
        </TouchableHighlight>

        <CurrentStep
          ref="currentStep"
          step={this.state.step}
          completeStep={this.stepComplete}
        />
      </View>
    );
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
