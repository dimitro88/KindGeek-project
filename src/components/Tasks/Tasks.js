import React, { Component } from 'react';
import DeleteModalWindow from "../ModalWindows/DeleteModalWindow"

import Button from '@material-ui/core/Button';
import ListItemDetails from '../ListItemDetails'

import "../../styles/list-of-tasks.css"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setListOfTasks, deleteItemFromList, updateCheckOfTask } from "../../actions/tasks";
import ItemsService from "../../services/ItemsService"
import {historyPush} from "../../helpers/historyPush";
import { PATHS } from "../../constants/routes"
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Tasks extends Component {

  activeKey = -1;

  constructor(props) {
    super(props);
    this.list = React.createRef();
    this.state = {
      activeId: "",
      open : false
    };
  }

  _handleClick = (flag, id, key) => () => {
    flag === true ? this.setState({ open: true }) : this.setState({ open: false });
    if(id){
      this.setState({ activeId: id});
      this.activeKey = key;
    }
  };

  _addNewItem = () => {
    historyPush(PATHS.CREATE_TASK);
  };

  _deleteItem = async () =>{
    await ItemsService.deleteTaskById(this.state.activeId)
      .then( res => {
        this.props.deleteItemFromList(this.activeKey);
        this.setState({ activeId: ""});
        this.setState({ open: false});
        this.activeKey = -1;
      }
    );
  };

  _check = (key, id) => () => {
    let checked = !this.props.tasks[key].isChecked;
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
      <h2 style={{textAlign : "center"}}>
        Tasks
      </h2>
      <div className="list">
      <ul
        ref={this.list}
        className="ul-list"
      >
        {
          this.props.tasks.map((task, key) => {
            return <ListItemDetails
              key={key}
              iteration={key}
              task={task}
              click={this._handleClick(true, task._id, key)}
              change={this._check(key, task._id)}
              checked={false}
            />
          })
        }
      </ul>
      </div>
      <div className="buttons">
        <Button
          className="add-button"
          variant="outlined"
          color="primary"
          onClick={this._addNewItem}
        >
          Add new
        </Button>
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
  setListOfTasks,
  deleteItemFromList,
  updateCheckOfTask
}, dispatch);

const mapStateToProps = ({tasks}) => {
  return {
    tasks: tasks.tasks
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);