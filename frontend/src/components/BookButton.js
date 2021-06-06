import React, { Component } from "react";
import { render } from "react-dom";

class BookButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input type="button" onclick={this.props.onClick} value="Book" />
    );
  }
}

export default BookButton;
