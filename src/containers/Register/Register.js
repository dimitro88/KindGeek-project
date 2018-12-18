import React, { Component } from 'react';
import RegisterForm from "./RegisterForm";

import 'react-notifications/lib/notifications.css';

import ItemsService from "../../services/ItemsService";

import {NotificationContainer, NotificationManager} from 'react-notifications';
import { historyPush } from "../../helpers/historyPush";
import {PATHS} from "../../constants/routes";

class Register extends Component {

  _handleSubmit = async (values) => {
    try {
      if(values.password === values.passwordConfirmation){
        await ItemsService.register(values)
        .then(
          res => {
            if(res.error){
              NotificationManager.error(res.message, "Message!", 5000)
            }
            else{
              historyPush(PATHS.LOGIN);
            }
          }
        );
      }
      else{
        NotificationManager.error("Passwords are not same", "Message!", 5000)
      }
    } catch (err) {
      NotificationManager.error(err.message, "Message!", 5000)
    }
  };

  render () {
    return <div>
      <RegisterForm onSubmit={this._handleSubmit} />
      <NotificationContainer/>
    </div>
  }
}

export default Register;
