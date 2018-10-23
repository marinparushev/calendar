import React, { Component } from 'react';

import './Navigation.css';

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

class Navigation extends Component {

  render() {
    const { onRewind, onClickPrevious, onClickNext, onFastForward, onClickToday, date } = this.props;
    return (
      <div className="navigation">
        <button className="btn-rewind" onClick={onRewind}>
          <i className="icon ion-md-rewind"></i>
        </button>
        <button className="btn-arrowleft" onClick={onClickPrevious}>
          <i className="icon ion-md-arrow-dropleft"></i>
        </button>
        <div className="month-and-year">{MONTHS[date.getMonth()]}, {date.getFullYear()}</div>
        <button className="btn-arrowright" onClick={onClickNext}>
          <i className="icon ion-md-arrow-dropright"></i>
        </button>
        <button className="btn-fastforward" onClick={onFastForward}>
          <i className="icon ion-md-fastforward"></i>
        </button>
        <button className="btn-today" onClick={onClickToday}>Today</button>
      </div>
    );
  }
}

export default Navigation;