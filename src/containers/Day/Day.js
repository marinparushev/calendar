import React, { Component } from 'react';

import EventDetails from '../EventDetails/EventDetails';

import './Day.css';

class Day extends Component {
  renderName() {
    if (this.props.day) {
      return (
        <span className="day-name">{this.props.day}, </span>
      )
    }
  }

  renderEvents() {
    return this.props.events && this.props.events.map( (event, index) => {
      return (
        <EventDetails
          key={index}
          eventId={event.id}
          onEventDelete={this.props.onEventDelete}
          title={event.title}
          details={event.details} />
      )
    });
  }

  /**
   * @returns {String} A string containing space separated class names used to highlight the rendered day.
   */
  getClasses() {
    const classNamesArr = ['day'];

    if (this.props.dimmed) {
      classNamesArr.push('dimmed')
    }

    if (this.props.today) {
      classNamesArr.push('today');
    }

    if (this.props.highlight) {
      classNamesArr.push("day-highlight");
    }

    return classNamesArr.join(' ');
  }

  render() {
    return (
      <div className={this.getClasses()}>
        <div className="day-inner">
          <div className="day-and-date">
            {this.renderName()}
            <span className="day-date">{this.props.date || 1}</span>
          </div>
          <div className="events">
            {this.renderEvents()}
          </div>
        </div>
      </div>
    );
  }
}

export default Day;