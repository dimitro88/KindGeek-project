import React, { Component } from 'react';

import ItemsService from "../../services/ItemsService";
import TasksDetails from "../../components/TasksDetails";

class TaskDetailsContainer extends Component {

  constructor () {
    super();
    this.state = {
      id: null,
      item: null
    }
  }

  componentDidMount() {
    const id =  this.props.params.match.params.id;
    ItemsService.getOne(id)
      .then(res => {
        this.setState({
          id,
          item: res
        })
      });
  }

  render () {
    const { id, item } = this.state;
    return <div className="item-details-container">
      <TasksDetails id={id} item={item}/>
    </div>
  }

}

export default TaskDetailsContainer;