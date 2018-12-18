import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateTimePicker from 'react-datetime-picker';

import { required } from "../../helpers/validateForm"

import { reduxForm, Form, Field } from 'redux-form';

import "../../styles/add-new-item.css"

class AddNewItemForm extends Component {

  renderTextField = (props) => {
    const {
      input,
      label,
      meta : {touched , error}
    } = props;
    return <TextField
      type={props.type}
      label={label}
      floatinglabeltext={label}
      helperText={touched && error}
      autoComplete="off"
      autoFocus={true}
      {...input}
    />
  };

  renderDatePicker = (props) => {
    const {
      input
    } = props;
    return <div>
      <DateTimePicker
        onChange={(...params) => input.onChange(params[0])}
        value={input.value}
      />
    </div>
  };

  render(){
    return <Form onSubmit={this.props.handleSubmit} className="form">
      <div className="container">
        <div className="inputs-container">
          <div className="info-field-wrapper-add">
            <p>Text of task : </p>
            <Field
              type="text"
              label="Text"
              name="text"
              className="input-field"
              component={this.renderTextField}
              validate={required}
            />
          </div>
          <div className="info-field-wrapper-add">
            <p>Choose date : </p>
            <Field
              text="date"
              type="text"
              name="date"
              component={this.renderDatePicker}
            />
          </div>
        </div>
        <div className="buttons-container-add">
          <Button className="add-button" type="submit">Add</Button>
        </div>
      </div>
    </Form>
  }
}

AddNewItemForm = reduxForm({
  form: 'addNewItem'
})(AddNewItemForm);

export default AddNewItemForm;