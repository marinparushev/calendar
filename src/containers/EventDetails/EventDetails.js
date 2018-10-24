import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EventDetails.css';

class EventDetails extends Component {
  static propTypes = {
    eventId: PropTypes.number,
    onEventDelete: PropTypes.func,
    title: PropTypes.string,
    details: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.onEventDelete(this.props.eventId);
  }

  render() {
    return (
      <div className="event">
        <div>
          <strong className="event-title">{this.props.title}</strong>
          <button className="event-delete-button" onClick={this.onDelete}>
            <i className="icon ion-md-trash"></i>
          </button>
        </div>
        <div>{this.props.details}</div>
      </div>
    );
  }
}

export default EventDetails;