import React, { Component } from 'react';

import Navigation from '../Navigation/Navigation';
import Month from '../Month/Month';

class Calendar extends Component {
  render() {
    return (
      <div className="calendar">
        <Navigation
          date={this.props.date}
          onRewind={this.props.onRewind}
          onClickPrevious={this.props.onClickPrevious}
          onClickNext={this.props.onClickNext}
          onFastForward={this.props.onFastForward}
          onClickToday={this.props.onClickToday} />
        <Month
          date={this.props.date}
          highlightDate={this.props.highlightDate}
          events={this.props.events}
          onEventDelete={this.props.onEventDelete}/>
      </div>
    );
  }
}

export default Calendar;