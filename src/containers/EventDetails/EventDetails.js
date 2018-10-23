import React, { Component } from 'react';

import './EventDetails.css';

class EventDetails extends Component {
  onDelete() {
    this.props.onEventDelete(this.props.eventId);
  }

  renderName() {
    if (this.props.day) {
      return (
        <span className="day-name">{this.props.day}, </span>
      )
    }
  }

  render() {
    return (
      <div className="event">
        <div>
          <strong className="event-title">{this.props.title}</strong>
          <button className="event-delete-button" onClick={this.onDelete.bind(this)}>
            <i className="icon ion-md-trash"></i>
          </button>
        </div>
        <div>{this.props.details}</div>
      </div>
    );
  }
}

export default EventDetails;