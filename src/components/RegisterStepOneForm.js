import React, { View } from "react-native";
import Tcomb from "tcomb-form-native";
import { Email } from "../lib/patterns";
import ItemCheckbox from "../components/ItemCheckbox";
// Password.getValidationErrorMessage = function (value) {
//   return "Invalid password, enter at least 2 chars";
// };

function samePasswords(x) {
  return x.password === x.confirmPassword;
}

let Type = Tcomb.subtype(Tcomb.struct({
  email: Email,
  phone: Tcomb.Number,
  password: Tcomb.String,
  confirmPassword: Tcomb.String,
}), samePasswords);

Type.getValidationErrorMessage = (value) => {
  if (!samePasswords(value)) {
    return "Password must match";
  }
};

let options = {
  fields: {
    email: {
      placeholder: "email",
    },
    phone: {
      placeholder: "phone",
    },
    password: {
      type: "password",
      secureTextEntry: true,
      placeholder: "password",
    },
    confirmPassword: {
      type: "password",
      secureTextEntry: true,
      placeholder: "confirm password",
    },
  },
};


let Form = Tcomb.form.Form;
let StepOne = React.createClass({
  render() {
    return (
      <View>
        <Tcomb.form.Form
          ref="form"
          type={Type}
          options={options}
        />
      </View>
    );
  },
});

export default StepOne;