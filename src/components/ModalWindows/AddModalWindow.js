import React, { Component } from 'react';
import AddNewItemForm from '../../containers/AddNewItemContainer/AddNewItemForm'

import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"

import "../../styles/get-task-by-id.css"

class AddModalWindow extends Component {

  render () {
    return <Dialog
        fullScreen={this.props.fullScreen}
        fullWidth={true}
        open={this.props.open}
        onClose={this.props.close}
      >
        <div className="dialog-container">
          <div className="dialog-header">
            <DialogTitle id="title">Create new task :</DialogTitle>
            <Button id="close-button" onClick={this.props.close} color="primary">
              X
            </Button>
          </div>
          <div className="input-field-container">
            <AddNewItemForm onSubmit={this.props.create} />
          </div>
        </div>
      </Dialog>
  }

}

export default AddModalWindow;