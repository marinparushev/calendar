import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';

import './Login.css';

export const CALENDAR_USER = 'calendar_user';

class Login extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this); 
  }

  componentWillMount() {
    const username = localStorage.getItem(CALENDAR_USER);

    this.setState({ username });
  }

  submitForm(е) {
    е.preventDefault();

    const username = this.refs.name.value;

    if (!username) {
      return;
    }

    localStorage.setItem(CALENDAR_USER, username);

    this.props.history.push('/main');
  }

  render() {
    if (this.state.username) {
      return <Redirect to="/main" />
    }
    
    return (
      <div className="login">
        <h1>Login</h1>
        <form className="loginForm" onSubmit={this.submitForm}>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" ref="name" />
          <Link onClick={this.submitForm} to="/main">Enter</Link>
        </form>
      </div>
      
    );
  }
}

export default withRouter(Login);