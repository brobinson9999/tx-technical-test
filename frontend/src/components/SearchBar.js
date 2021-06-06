import React, { Component } from "react";
import { render } from "react-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input type="text" value={this.props.value} onChange={this.props.onChange}/>
    );
  }
}

export default SearchBar;
