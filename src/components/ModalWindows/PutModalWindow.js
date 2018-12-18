import React, { Component } from 'react';
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"

import "../../styles/get-task-by-id.css"

class PutModalWindow extends Component {

  render () {
    return <Dialog
        fullScreen={this.props.fullScreen}
        fullWidth={true}
        open={this.props.open}
        onClose={this.props.close}
      >
        <div className="edit-dialog-container">
          <div className="dialog-header">
            <DialogTitle id="title">Your task : </DialogTitle>
            <Button id="close-button" onClick={this.props.close} color="primary">
              X
            </Button>
          </div>
          {!this.props.edit &&
          <div className="edit-container">
            <p id="task-text-info">{this.props.item.text}</p>
            <Button id="edit-button" onClick={() => this.props.editElem(true)} color="primary">
              Edit
            </Button>
          </div>
          }
          {this.props.edit &&
          <div className="edit-container">
            <TextField type="text" className="put-text-info" value={this.props.inputValue} onChange={(e)=> this.props.change(e)}/>
            <Button id="save-button" color="primary" onClick={this.props.editElemInDB}>
              Save
            </Button>
            <Button id="back-button" color="primary" onClick={() => this.props.editElem(false)}>
              Back
            </Button>
          </div>
          }
        </div>
      </Dialog>
  }
}

export default PutModalWindow;