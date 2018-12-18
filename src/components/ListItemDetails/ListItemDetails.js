import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem'

import { colorChanger } from '../../helpers/colorChanger'

import moment from 'moment'

import "../../styles/list-of-tasks.css"

class ListItemDetails extends Component {

  state = {
    style: "",
  };

  componentDidMount(){
    this._setColor();
    this.interval = setInterval(this._setColor,100);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  _setColor = () => {
    this.setState({style : colorChanger(this.props.task, !this.props.checked)});
  };

  render () {
    return <ListItem className={this.state.style}>
      <Checkbox
        onChange={this.props.change}
        checked={this.props.checked}
      />
      <Link to={"/tasks/" + this.props.task._id}>
        {this.props.task.text}
        </Link>
      <div className="list-item-status-filed">
        <IconButton
          aria-label="Delete"
          className="del-button"
          onClick={this.props.click}
        >
          <DeleteIcon/>
        </IconButton>
        {!this.props.checked && <div className="list-item-date">
          <p>{moment(this.props.task.expires_at).fromNow()}</p>
        </div>}
      </div>
    </ListItem>
  }
}



export default ListItemDetails;