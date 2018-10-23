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
    if (this.props.events.length > 0) {
      return (
        <div className="events">
          {this.renderEventDetails()}
        </div>
      )
    }
  }

  renderEventDetails() {
    return this.props.events.map( (event, index) => {
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

    if (this.props.isHighlighted) {
      classNamesArr.push("day-highlight");
    }

    if (this.props.events.length > 0) {
      classNamesArr.push("day-with-events");
    }

    if (this.props.isWeekend) {
      classNamesArr.push("day-weekend");
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
          {this.renderEvents()}
        </div>
      </div>
    );
  }
}

export default Day;