import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Autocomplete.css';

const KEY_CODES = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  ESCAPE: 27
}

class Autocomplete extends Component {
  static propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      currentFocus: -1
    };

    this.onInput = this.onInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  onInput(e) {
    const { value } = e.target;
    this.setState({ 
      currentFocus: -1,
      value
    });
  }

  onKeyDown(e) {
    const items = this.refs.autocompleteList.getElementsByTagName('div');
    let { currentFocus } = this.state;

    if (e.keyCode === KEY_CODES.DOWN) {
      currentFocus++;
      currentFocus %= items.length;

      this.setState({ currentFocus: currentFocus });
    } else if (e.keyCode === KEY_CODES.UP) {
      currentFocus--;
      if (currentFocus < 0) {
        currentFocus = items.length - 1;
      }
      this.setState({ currentFocus: currentFocus });
    } else if (e.keyCode === KEY_CODES.ENTER) {
      e.preventDefault();

      if (currentFocus > -1) {
        const item = items[currentFocus];
        item && item.click()
      }
    } else if (e.keyCode === KEY_CODES.ESCAPE) {
      this.closeList();
    }
  }

  onItemClick(e) {
    const eventTitle = e.currentTarget.getElementsByTagName('input')[0].value;
    this.refs.autocompleteInput.value = eventTitle;

    this.closeList();

    this.props.onSelect(eventTitle);
  }

  closeList() {
    this.setState({ value: "" });
  }

  renderSuggestions() {
    const val = this.state.value,
          len = val.length,
          { data } = this.props;

    let items = [];

    if (!val) {
      return;
    }

    for(let i = 0, j = 0; i < data.length; i++) {
      if (data[i].substr(0, len).toUpperCase() === val.toUpperCase()) {
        let itemClass = this.state.currentFocus === j ? 'autocomplete-active' : '';
        items.push(
          <div key={data[i] + i} onClick={this.onItemClick} className={itemClass}>
            <strong>{data[i].substr(0, len)}</strong>
            {data[i].substr(len)}
            <input type="hidden" value={data[i]} />
          </div>
        );

        j++;
      }
    }

    return items;
  }

  render() {
    return (
        <div className="autocomplete">
          <input
            autoComplete="off"
            type="text"
            ref="autocompleteInput"
            onInput={this.onInput}
            onKeyDown={this.onKeyDown} />
          <div className="autocomplete-items" ref="autocompleteList">
            {this.renderSuggestions()}
          </div>
        </div>
    );
  }
}

export default Autocomplete;