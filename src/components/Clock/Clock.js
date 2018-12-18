import React, { Component } from 'react';

import moment from 'moment';

import "../../styles/list-container.css"

class Clock extends Component {

  showClock = React.createRef();

  componentDidMount(){
    this._clock();
    this.interval = setInterval(this._clock, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  _clock = () => {
    this.showClock.current.innerText = moment().format('LTS');
  };

  render () {
    return <div className="clock-in-header">
      <p ref={this.showClock}></p>
    </div>
  }
}

export default Clock;