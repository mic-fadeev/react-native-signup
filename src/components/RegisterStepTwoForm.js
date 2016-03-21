import React, { View, TouchableHighlight, Text } from "react-native";
import Tcomb from "tcomb-form-native";


function samePasswords(x) {
  return x.password === x.confirmPassword;
}

let Type = Tcomb.struct({
  firstName: Tcomb.String,
  lastName: Tcomb.String,
});

Type.getValidationErrorMessage = (value) => {
  if (!samePasswords(value)) {
    return "Password must match";
  }
};

let options = {
  fields: {
    firstName: {
      placeholder: "first name",
    },
    lastName: {
      placeholder: "last name",
    },
  },
};


let Form = Tcomb.form.Form;
let StepTwo = React.createClass({
  render() {
    return (
      <View>
        <TouchableHighlight>
          <Text>
            Step {this.props.step}...
          </Text>
        </TouchableHighlight>
        <Tcomb.form.Form
          ref="form"
          type={Type}
          options={options}
        />
      </View>
    );
  },
});

export default StepTwo;