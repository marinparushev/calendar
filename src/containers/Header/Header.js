import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './Header.css'
import Autocomplete from '../Autocomplete/Autocomplete';
import { CALENDAR_USER } from '../Login/Login';

class Header extends Component {
  constructor() {
    super();

    this.onAdd = this.onAdd.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onAdd() {
    this.props.history.push('/add');
  }

  onLogout() {
    localStorage.removeItem(CALENDAR_USER);

    this.props.history.push('/');
  }

  render() {
    const eventTitles = this.props.events.map( (event) => { return event.title; });

    return (
      <div className="header">
        <div className="actions">
          <button onClick={this.onAdd}>Add new</button>
          <button onClick={this.props.onRefresh}>Refresh</button>
        </div>
        
        <div>
          <span className="user">{this.props.username}</span>
          <div className="search">
            <i className="icon ion-md-search"></i>
            <Autocomplete
              data={ eventTitles }
              onSelect={this.props.onEventSelect}
              />
          </div>
          <button className="logout" onClick={this.onLogout}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);