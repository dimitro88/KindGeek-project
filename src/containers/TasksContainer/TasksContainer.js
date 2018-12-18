import React, { Component } from 'react';
import Tasks from "../../components/Tasks";
import CheckedTasksContainer from "../../containers/CheckedTasksContainer";
import Button from '@material-ui/core/Button';
import ItemsService from "../../services/ItemsService"
import AuthService from "../../services/AuthService"
import Paper from '@material-ui/core/Paper';
import Filter from '../../components/Filter';
import SquareStyles from '../../components/SquareStyles';
import Clock from '../../components/Clock';

import moment from 'moment';

import { historyPush } from "../../helpers/historyPush";
import {PATHS} from "../../constants/routes";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setListOfTasks, deleteItemFromList, deleteDoneTasksOfUser , deleteTasksOfUser} from "../../actions/tasks";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import "../../styles/list-container.css";

class TasksContainer extends Component {

  body = React.createRef();

  componentDidMount(){
    ItemsService.getAll()
      .then(res => {
        this.props.setListOfTasks(res);
      });
  }

  _deleteTasks = async () => {
    await ItemsService.deleteItems()
      .then(res => {
        this.props.deleteTasksOfUser();
      });
  };

  _deleteCheckedTasks = async () => {
    await ItemsService.deleteCheckedTasks()
      .then(res => {
        this.props.deleteDoneTasksOfUser();
      });
  };

  _logOut = () => {
    AuthService.logOut();
    historyPush(PATHS.LOGIN);
  };

  _filter = (values) => {
    if(moment(values.secondDate).isAfter(values.firstDate) && moment(values.firstDate).isAfter(moment.now())){
      ItemsService.filteredTasks(values)
        .then(res => {
          this.props.setListOfTasks(res);
          })
        .catch(err => NotificationManager.error(err.message, "Message!", 5000))
    }
    else{
      NotificationManager.error("Wrong data picked!", "Message!", 5000)
    }
  };

  render () {
    return <div className="tasks-main-layout">
      <Paper className="tasks-header-for-logout-button">
        <Clock />
        <Filter
          onSubmit={this._filter}
          setList={this.props.setListOfTasks}
        />
        <div className="log-out">
            <Button onClick={this._logOut}>LogOut</Button>
        </div>
      </Paper>
      <div className="body" ref={this.body}>
        <SquareStyles
          component={this.body}
        />
        <div className="list-container">
          <div className="tasks">
            <Tasks/>
            <div className="text-tasks-container">
              <p>{this.props.tasks.length} tasks left!</p>
              <Button onClick={this._deleteTasks}>Clear all</Button>
            </div>
          </div>
          <div className="checked-tasks">
            <CheckedTasksContainer/>
            <div className="text-tasks-container">
              <p>{this.props.checkedTasks.length} tasks done!</p>
              <Button onClick={this._deleteCheckedTasks}>Clear all</Button>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  }

}

const mapDispatchToProps = dispatch => bindActionCreators({
  setListOfTasks,
  deleteItemFromList,
  deleteDoneTasksOfUser,
  deleteTasksOfUser
}, dispatch);

const mapStateToProps = ({tasks}) => {
  return {
    tasks: tasks.tasks,
    checkedTasks: tasks.checkedTasks,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
