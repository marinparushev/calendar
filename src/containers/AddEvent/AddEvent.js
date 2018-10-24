import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import DateTime from 'react-datetime';

import './AddEvent.css';

import { CALENDAR_USER } from '../Login/Login';

class AddEvent extends Component {
  constructor(props) {
    super(props);

    // Needed to display the calendar in Bulgarian
    require('moment/locale/bg');

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this)
  }

  componentWillMount() {
    const username = localStorage.getItem(CALENDAR_USER);

    this.setState({ username });
  }

  onSubmit(e) {
    e.preventDefault();

    this.saveEvent();
    
    this.props.history.push('/main');
  }

  onCancel(e) {
    this.props.history.push('/main');
  }

  /**
   * Saves the event data to the local storage.
   */
  saveEvent() {
    const dateNow = new Date();
    const date = new Date(this.refs.datetime.state.selectedDate).toISOString();
    const event = {
      id: dateNow.getTime(),
      title: this.refs.title.value,
      participants: this.refs.participants.value,
      details: this.refs.details.value,
      date,
      owner: this.state.username
    };

    let savedEvents = JSON.parse(localStorage.getItem("events"));
    
    if (savedEvents) {
      savedEvents.events.push(event);
    } else {
      savedEvents = {
        events: [ event ]
      };
    }

    localStorage.setItem("events", JSON.stringify(savedEvents));
  }

  render() {
    if (!this.state.username) {
      return <Redirect to="/" />
    }

    return (
      <div className="add-event">
        <form className="add-user-form" onSubmit={this.onSubmit}>
          <div className="form-row">
            <label>Event title</label>
            <input type="text" ref="title"/>
          </div>
          <div className="form-row">
          <label>Participants</label>
          <input type="text" ref="participants"/>
          </div>
          <div className="form-row">
            <label>Details</label>
            <input type="text" ref="details"/>
          </div>
          <div className="form-row">
            <label>Date&Time</label>
            <DateTime ref="datetime"/>
          </div>
          <button type="submit">Add</button>
          <button className="cancel-button" type="button" onClick={this.onCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddEvent);