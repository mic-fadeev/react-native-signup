let PAYPAL_CLIENT_ID = "AWMhVBCfIKOZl3zkr6RwOmGxabeXjd8hhA17VT4--KOBAB5KP5SLM7IxhmCg";
let CARD_IO_TOKEN = "514d9191dcf64cad8d9fcc09d9e265d1";
let PAYPAL_MERCHANT_NAME = "Salon Rescue";
let PAYPAL_PRIVACY_POLICY = "https://salonerescue.me/privacy";
let PAYPAL_MERCHANT_USER_AGREEMENT = "https://salonrescue.me/legal";

import React, { View, TouchableHighlight, Text } from "react-native";
import Tcomb from "tcomb-form-native";

let Type = Tcomb.struct({
  payerid: Tcomb.String,
});

let options = {
  fields: {
    payerid: {
      label: "payerid",
    },
  },
};


let Form = Tcomb.form.Form;
let StepThree = React.createClass({
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

export default StepThree;