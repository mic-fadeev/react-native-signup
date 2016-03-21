import React, { View } from "react-native";
import Tcomb from "tcomb-form-native";
import { Email } from "../lib/patterns";


function samePasswords(x) {
  return x.password === x.confirmPassword;
}

let Type = Tcomb.subtype(Tcomb.struct({
  email: Email,
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
let RegisterForm = React.createClass({
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

export default RegisterForm;