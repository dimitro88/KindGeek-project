import React, { Component } from 'react';

import "../../styles/list-container.css"

class SquareStyles extends Component {

  state = {
    color : "darkgray"
  };

  _onEnterColor = (color) => () => {
    this.props.component.current.style.background = color;
  };

  _changeColor = (color) => () => {
    this.props.component.current.style.background = color;
    this.setState({color : color});
  };

  _onLeaveColor = () => {
    this.props.component.current.style.background = this.state.color;
  };

  render () {
    return <div className="styles-in-header">
      <div
        className="pink-background"
        onMouseEnter={this._onEnterColor("pink")}
        onClick={this._changeColor("pink")}
        onMouseLeave={this._onLeaveColor}
      ></div>
      <div
        className="yellow-background"
        onMouseEnter={this._onEnterColor("yellow")}
        onClick={this._changeColor("yellow")}
        onMouseLeave={this._onLeaveColor}
      ></div>
      <div
        className="green-background"
        onMouseEnter={this._onEnterColor("greenyellow")}
        onClick={this._changeColor("greenyellow")}
        onMouseLeave={this._onLeaveColor}
      ></div>
      <div
        className="default-background"
        onMouseEnter={this._onEnterColor("darkgray")}
        onClick={this._changeColor("darkgray")}
        onMouseLeave={this._onLeaveColor}
      ></div>
    </div>
  }
}

export default SquareStyles;