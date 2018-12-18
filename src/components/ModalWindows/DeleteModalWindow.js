import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"

import "../../styles/list-container.css";

class DeleteModalWindow extends Component {

  render () {
    return <Dialog
      fullScreen={this.props.fullScreen}
      fullWidth={true}
      open={this.props.open}
      onClose={this.props.close}
    >
      <div className="dialog-container">
        <div className="dialog-header">
          <DialogTitle id="title">Do you want to delete this item? </DialogTitle>
          <Button id="close-button" onClick={this.props.close} color="primary">
            X
          </Button>
        </div>
        <div className="buttons">
          <Button className="add-button" variant="outlined" color="primary" onClick={this.props.delete}>Yes</Button>
          <Button className="add-button" variant="outlined" color="primary" onClick={this.props.close}>No</Button>
        </div>
      </div>
    </Dialog>
  }
}

export default DeleteModalWindow;