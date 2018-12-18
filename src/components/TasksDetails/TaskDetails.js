import React, { Component } from 'react';
import PutModalWindow from "../ModalWindows/PutModalWindow"

import { historyPush } from "../../helpers/historyPush"
import { PATHS } from "../../constants/routes"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateItemById } from "../../actions/tasks";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import ItemsService from "../../services/ItemsService"

import "../../styles/get-task-by-id.css"

class TaskDetails extends Component {

  state = {
    open : true,
    edit : false,
    inputValue : "",
  };

  _handleClick = (flag) => () => {
    flag === true ? this.setState({ open: true }) : this.setState({ open: false });
    historyPush(PATHS.TASKS);
  };

  _editElement = () => {
    let deleted = false;
    if(this.state.inputValue.length === 0)deleted = true;
    if(this.state.inputValue.length === 1){
      NotificationManager.error("Name of task must be longer", "Message!", 5000);
      return null;
    }
    ItemsService.updateItem(this.props.id, this.state.inputValue)
      .then(res => {
        if(res.error){
          NotificationManager.error(res.message, "Message!", 5000)
        }
        else{
          this.props.updateItemById(this.props.id, res.text, deleted, res.isChecked);
          historyPush(PATHS.TASKS);
        }
      })
      .catch(err => NotificationManager.error(err.message, "Message!", 5000));
  };

  _edit = (flag) => {
    flag ?
    this.setState({edit : true, inputValue: this.props.item.text}) : this.setState({edit : false});
  };

  _changeInput = (event) => {
    this.setState({inputValue : event.target.value});
  };



  render () {
    const { id, item } = this.props;
    return id && <div>
      <PutModalWindow
        edit={this.state.edit}
        close={this._handleClick(false)}
        open={this.state.open}
        item={item}
        editElem={this._edit}
        inputValue={this.state.inputValue}
        change={this._changeInput}
        editElemInDB={this._editElement}
      />
      <NotificationContainer/>
    </div>
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateItemById
}, dispatch);

export default connect(null, mapDispatchToProps)(TaskDetails);