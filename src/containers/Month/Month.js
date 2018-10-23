import React, { Component } from 'react';

import Day from '../Day/Day';
import './Month.css';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_IN_WEEK = 7;
const DAY_IN_MILLISECONDS = 86400000; // Milliseconds in 1 day

class Month extends Component {
  /**
   * 
   * @param {Date} date
   * @returns {Date} The first date to be displayed in the calendar. It is very likely to be a date from the previous month.
   */
  getFirstDisplayedDate(date) {
    const firstDayOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDay = firstDayOfTheMonth.getDay(); // the first day of the month (1 for Monday, 2 for Tuesday, etc)

    if (firstDay === 0) { // if first day is Sunday
      firstDay = DAYS_IN_WEEK; // set firstDay = 7. This is needed because the calendar week starts on Monday
    }

    return new Date(firstDayOfTheMonth.getTime() - (firstDay - 1) * DAY_IN_MILLISECONDS);
  }

  /**
   * 
   * @param {Date} date 
   * @returns {Date} The last date to be displayed in the calendar. It is very likely to be a date from the next month.
   */
  getLastDisplayedDate(date) {
    const lastDayOfTheMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let lastDay = lastDayOfTheMonth.getDay(); // the last day of the month (1 for Monday, 2 for Tuesday, etc)

    if (lastDay === 0) { // if first day is Sunday
      lastDay = DAYS_IN_WEEK; // set firstDay = 7. This is needed because the calendar week starts on Monday
    }
    
    return new Date(lastDayOfTheMonth.getTime() + (DAYS_IN_WEEK - lastDay) * DAY_IN_MILLISECONDS);
  }

  /**
   * 
   * @param {Date} First date
   * @param {Date} Second date
   * Returns true if the first and the second date represent the same day.
   */
  isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  /**
   * @returns {Day[]} A list of Day objects to be rendered
   */
  renderDays() {
    const date = this.props.date || new Date(),
          highlightDate = this.props.highlightDate,
          lastDay = this.getLastDisplayedDate(date),
          dateNow = new Date(),
          days = [];

    let i = 0,
        currentDay = this.getFirstDisplayedDate(date);

    while (currentDay.getTime() <= lastDay.getTime()) {
      const dayName = DAYS_OF_WEEK[i] || "",
            isDimmed = currentDay.getMonth() !== date.getMonth(),
            isToday = this.isSameDay(currentDay, dateNow),
            isHighlighted = highlightDate && this.isSameDay(currentDay, highlightDate),
            isWeekend = currentDay.getDay() === 0 || currentDay.getDay() === 6;

      const todaysEvents = this.props.events && this.props.events.filter( function(event) {
        return this.isSameDay(event.date, currentDay);
      }.bind(this));

      days.push(
        <Day 
          key={i}
          day={dayName}
          date={currentDay.getDate()}
          dimmed={isDimmed}
          today={isToday}
          isHighlighted={isHighlighted}
          isWeekend={isWeekend}
          events={todaysEvents}
          onEventDelete={this.props.onEventDelete}
        />
      );

      i++;

      /* Increase currentDay by one day. We can't simply assign:
      currentDay = new Date(currentDay.getTime() + DAY_IN_MILLISECONDS);
      because errors may occur due to daylight time saving changes. */
      currentDay = new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate() + 1,
        currentDay.getHours(),
        currentDay.getMinutes(),
        currentDay.getSeconds(),
        currentDay.getMilliseconds()
      );
    }

    return days;
  }

  render() {
    return (
      <div className="month">
        {this.renderDays()}
      </div>
    );
  }
}

export default Month;