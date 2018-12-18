import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { historyPush } from "../../helpers/historyPush";
import {PATHS} from "../../constants/routes";
import { reduxForm, Form, Field } from 'redux-form';

import {email, required} from "../../helpers/validateForm"

import "../../styles/login.css"

class LoginForm extends Component {

  renderTextField = (props) => {

    const {
      input,
      label,
      meta: {touched, error}
    } = props;

    console.log(props);

    return <TextField
      type={props.type}
      label={label}
      floatinglabeltext={label}
      helperText={touched && error}
      autoComplete="off"
      {...input}
    />
  };

  render(){
    return <Form onSubmit={this.props.handleSubmit}  className="login-body">
      <Paper className="login-container">
        <div className="info-field-wrapper-login">
          <h2 className="h2">Login</h2>
          <Field
            type="text"
            label="username"
            name="username"
            className="info-field-login red-textfield-help-text"
            component={this.renderTextField}
            validate={[required, email]}
          />
        </div>
        <div className="info-field-wrapper-login">
          <Field
            label="password"
            type="password"
            name="password"
            className="info-field-login red-textfield-help-text"
            component={this.renderTextField}
            validate={required}
          />
        </div>
        <div className="buttons-container-login">
          <Button type="submit" className="buttons-login" variant="outlined" color="primary">Login</Button>
          <Button className="buttons-login" variant="outlined" color="primary"
                  onClick={() => historyPush(PATHS.REGISTER)}>Register</Button>
        </div>
      </Paper>
    </Form>
  }

}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;
