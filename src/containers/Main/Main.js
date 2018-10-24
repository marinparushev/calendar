import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Main.css';

import Calendar from '../Calendar/Calendar';
import Header from '../Header/Header';

import { CALENDAR_USER } from '../Login/Login';

class Main extends Component {
  constructor(props) {
    super(props);   

    this.state = {
      date: new Date()
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onRewind = this.onRewind.bind(this);
    this.onClickPrevious = this.onClickPrevious.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onFastForward = this.onFastForward.bind(this);
    this.onClickToday = this.onClickToday.bind(this);
    this.onEventDelete = this.onEventDelete.bind(this);
  }

  componentWillMount() {
    const username = localStorage.getItem(CALENDAR_USER);

    // no need to fetch the events if the user is not logged in
    if (username) {
      this.setState({
        username,
        events: this.fetchEvents(username)
      });
    }
  }

  onRefresh() {
    this.setState({
      events : this.fetchEvents(this.state.username)
    })
  }

  /**
   * 
   * @param {String} username The user whose events are fetched.
   */
  fetchEvents(username) {
    const data = JSON.parse(localStorage.getItem("events"));
    let events;

    // if there are events in the local storage
    if (data) {
      events = data.events.filter( (event) => { // filter only the current user's events
        return event.owner === username;
      }).map( (event) => {
        event.date = new Date(event.date); // convert the date string to Date object
        return event;
      });
    }

    return events;
  }

  /**
   * Executed when an event is selected from the search drop down in the header.
   * @param {String} eventTitle - The title of the event
   */
  onEventSelect(eventTitle) {
    const event = this.state.events.filter( (event) => {
      return event.title === eventTitle;
    })[0];

    const date = new Date(event.date);

    this.setState({
      date,
      highlightDate: new Date(event.date)
    });
  }

  /**
   * Moves the calendar one year back.
   */
  onRewind() {
    const { date } = this.state;
    const rewindDate = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
    this.setState({ date: rewindDate });
  }

  /**
   * Moves the calendar one year forward.
   */
  onFastForward() {
    const { date } = this.state;
    const fastForwardDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
    this.setState({ 
      date: fastForwardDate,
      highlightDate: null
    });
  }

  /**
   * Moves the calendar one month back.
   */
  onClickPrevious() {
    const { date } = this.state;
    const prevDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    this.setState({
      date: prevDate,
      highlightDate: null
    });
  }

  /**
   * Moves the calendar one month forward.
   */
  onClickNext() {
    const { date } = this.state,
          nextDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    this.setState({
      date: nextDate,
      highlightDate: null
    });
  }

  /**
   * Moves the calendar to the current month.
   */
  onClickToday() {
    const date = new Date();
    this.setState({
      date,
      highlightDate: null
    });
  }

  /**
   * Deletes the event with the given eventId.
   * @param {Number} eventId - The event to be deleted.
   */
  onEventDelete(eventId) {
    const data = JSON.parse(localStorage.getItem('events'));

    data.events = data.events.filter( (event) => {
      return event.id !== eventId;
    });

    localStorage.setItem('events', JSON.stringify(data));

    data.events = data.events.filter( (event) => {
      return event.owner === this.state.username
    }).map( (event) => {
      event.date = new Date(event.date);
      return event;
    });

    this.setState({
      events: data.events
    });
  }

  render() {
    if (!this.state.username) {
      return <Redirect to="/" />
    }

    return (
      <div className="main">
        <Header
          onRefresh={this.onRefresh}
          username={this.state.username}
          events={this.state.events}
          onEventSelect={this.onEventSelect.bind(this)}/>
        <Calendar
          date={this.state.date}
          highlightDate={this.state.highlightDate}
          events={this.state.events}
          onRewind={this.onRewind}
          onClickPrevious={this.onClickPrevious}
          onClickNext={this.onClickNext}
          onFastForward={this.onFastForward}
          onClickToday={this.onClickToday}
          onEventDelete={this.onEventDelete} />
      </div>
    );
  }
}

export default Main;
