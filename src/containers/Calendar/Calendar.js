import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation/Navigation';
import Month from '../Month/Month';

class Calendar extends Component {
  static propTypes = {
    date: PropTypes.object,
    highlightDate: PropTypes.object,
    events: PropTypes.array,
    onRewind: PropTypes.func,
    onClickPrevious: PropTypes.func,
    onClickNext: PropTypes.func,
    onFastForward: PropTypes.func,
    onClickToday: PropTypes.func,
    onEventDelete: PropTypes.func
  }
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