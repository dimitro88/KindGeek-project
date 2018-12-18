import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { historyPush } from "../../helpers/historyPush";
import {PATHS} from "../../constants/routes";
import { reduxForm, Form, Field } from 'redux-form';
import { email, required, password } from '../../helpers/validateForm'

import "../../styles/register.css"

class RegisterForm extends Component {

  renderTextField = (props) => {

    const {
      input,
      label,
      meta: {touched, error}
    } = props;

    return <TextField
      type={props.type}
      label={label}
      floatinglabeltext={label}
      helperText={touched && error}
      autoComplete="off"
      {...input}
    />
  };

  render () {
    return <Form onSubmit={this.props.handleSubmit}  className="register-body">
      <Paper className="register-container">
        <div className="info-field-wrapper-register">
          <h2 className="h2" >Register</h2>
          <Field
            className="info-field-in-header"
            label="firstName"
            name="firstName"
            type="text"
            component={this.renderTextField}
            validate={required}
          />
        </div>
        <div className="info-field-wrapper-register">
          <Field
            className="info-field"
            name="secondName"
            type="text"
            label="secondName"
            component={this.renderTextField}
            validate={required}
          />
        </div>
        <div className="info-field-wrapper-register">
          <Field
            className="info-field"
            name="username"
            type="text"
            label="username"
            component={this.renderTextField}
            validate={[required, email]}
          />
        </div>
        <div className="info-field-wrapper-register">
          <Field
            className="info-field"
            name="password"
            type="password"
            label="password"
            component={this.renderTextField}
            validate={[required, password]}
          />
        </div>
        <div className="info-field-wrapper-register">
          <Field
            className="info-field"
            name="passwordConfirmation"
            type="password"
            label="passwordConfirmation"
            component={this.renderTextField}
            validate={[required, password]}
          />
        </div>
        <div className="buttons-container-register">
          <Button type="submit" className="buttons" variant="outlined" color="primary">Register</Button>
          <Button className="buttons" variant="outlined" color="primary" onClick={()=> historyPush(PATHS.LOGIN)}>To login</Button>
        </div>
      </Paper>
    </Form>
  }
}

RegisterForm = reduxForm({
  // a unique name for the form
  form: 'register'
})(RegisterForm);

export default RegisterForm;
