import React, { Component } from 'react';
import DeleteModalWindow from "../../components/ModalWindows/DeleteModalWindow"
import ListItemDetails from "../../components/ListItemDetails"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCheckOfTask, deleteItemFromCheckedList } from "../../actions/tasks";
import ItemsService from "../../services/ItemsService"
import {NotificationContainer, NotificationManager} from 'react-notifications';

import "../../styles/list-container.css"

class CheckedTasksContainer extends Component {

  state = {
    activeId: "",
    open : false
  };

  activeKey = -1;

  _handleClick = (flag, id, key) => () => {
    flag === true ? this.setState({ open: true }) : this.setState({ open: false });
    if(id){
      this.setState({ activeId: id});
      this.activeKey = key;
    }
  };

  _deleteItem = async () =>{
    await ItemsService.deleteTaskById(this.state.activeId)
      .then( res => {
          this.props.deleteItemFromCheckedList(this.activeKey);
          this.setState({ activeId: ""});
          this.setState({ open: false});
          this.activeKey = -1;
        }
      );
  };

  _check = (key, id) => () => {
    let checked = !this.props.checkedTasks[key].isChecked;
    ItemsService.updateCheckedOfTask(checked, id)
      .then( res => {
          this.props.updateCheckOfTask(checked, key);
        }
      )
      .catch(err => {
        NotificationManager.error(err.message, "Message!", 5000)
        }
      );
  };

  render () {
    return <div className="items">
      <h2 style={{textAlign: "center"}}>
        Done tasks
      </h2>
      <div className="list">
        <ul id="ul-list">
          {
            this.props.checkedTasks.map((task, key) => {
              return <ListItemDetails
                key={key}
                iteration={key}
                task={task}
                click={this._handleClick(true, task._id, key)}
                change={this._check(key, task._id)}
                checked={true}
              />
            })
          }
        </ul>
      </div>
      <DeleteModalWindow
        close={this._handleClick(false)}
        open={this.state.open}
        delete={this._deleteItem}
      />
      <NotificationContainer/>
    </div>

  }

}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCheckOfTask,
  deleteItemFromCheckedList
}, dispatch);

const mapStateToProps = ({tasks}) => {
  return {
    checkedTasks: tasks.checkedTasks
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckedTasksContainer);
