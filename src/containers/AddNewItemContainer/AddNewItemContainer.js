import React, { Component } from 'react';

import AddModalWindow from '../../components/ModalWindows/AddModalWindow'

import moment from 'moment'

import {NotificationContainer, NotificationManager} from 'react-notifications';
import { historyPush } from "../../helpers/historyPush"
import { PATHS } from "../../constants/routes"

import ItemsService from "../../services/ItemsService";
import "../../styles/get-task-by-id.css"

class AddNewItemContainer extends Component {

  state = {
    open : true,
    inputValue : "",
  };

  _handleClick = (flag) => () => {
    flag === true ? this.setState({ open: true }) : this.setState({ open: false });
    historyPush(PATHS.TASKS);
  };

  _handleSubmit = (values) => {
    const now = moment.now();
    if(!values.text || !localStorage.getItem("userId") || !values.date){
      NotificationManager.error("Complete all fields", "Error!", 5000)
    }
    else if(moment(values.date).isAfter(now)){
      ItemsService.createTask(values)
      .then(
        (res) => {
          if(res.error){
            NotificationManager.error(res.message, "Message!", 5000)
          }
          else{
            this.setState({open: false});
            historyPush(PATHS.TASKS);
          }
        }
      )
      .catch( err =>
        NotificationManager.error(err.message, "Message!", 5000)
      );
    }
    else{
      NotificationManager.error("You cant choose previous time!", "Message!", 5000)
    }
  };

  render () {
    return <div>
      <AddModalWindow open={this.state.open} close={this._handleClick(false)} create={this._handleSubmit}/>
      <NotificationContainer/>
    </div>
  }

}

export default AddNewItemContainer;