import React , { Component } from 'react';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import { historyPush } from "../../helpers/historyPush";
import {PATHS} from "../../constants/routes";

import ItemsService from "../../services/ItemsService";
import AuthService from "../../services/AuthService"

import LoginForm from "./LoginForm";

import "../../styles/login.css"

class Login extends Component {

  _handleSubmit = (values) => {
    ItemsService.login(values)
    .then(
      res => {
        if(res.error){
          NotificationManager.error(res.message, "Message!", 5000);
        }
        else{
          AuthService.login(res.token, res.user.id);
          historyPush(PATHS.TASKS);
        }
      }
    )
    .catch(err => {
        NotificationManager.error(err.message, "Message!", 5000);
      }
    );
  };

  render () {
    return (
      <div>
        <LoginForm onSubmit={this._handleSubmit} />
        <NotificationContainer/>
      </div>
    )
  }
}


export default Login;
