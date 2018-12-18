import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import ItemsService from "../../services/ItemsService"

import { reduxForm, Form, Field } from 'redux-form';
import Button from '@material-ui/core/Button';

import "../../styles/list-container.css"

class Filter extends Component {

  _reset = () => {
    ItemsService.getAll()
      .then(res => {
        this.props.setList(res);
      });
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

  render () {
    return <Form className="filter-in-header" onSubmit={this.props.handleSubmit}>
      <div className="first-filter-input">
        <p>Fist date : </p>
        <Field
          type="text"
          name="firstDate"
          component={this.renderDatePicker}
        />
      </div>
      <div className="second-filter-input">
        <p>Second date : </p>
        <Field
          type="text"
          name="secondDate"
          component={this.renderDatePicker}
        />
      </div>
      <Button type="submit">Get</Button>
      <Button onClick={this._reset} className="reset-button">Reset</Button>
    </Form>
  }
}

Filter = reduxForm({
  form: 'filterForm'
})(Filter);

export default Filter;