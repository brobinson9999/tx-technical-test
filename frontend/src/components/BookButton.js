import React, { Component } from "react";
import { render } from "react-dom";
import BookDialog from "./BookDialog";

class BookButton extends Component {
  constructor(props) {
    super(props);
	this.state = {
		dialogVisible: false
	};

	this.handleChange = this.handleChange.bind(this);	
  }

  handleChange(event)
  {
    this.setState({dialogVisible: true});
  }

  render() {
    return (
	  <div>
        <input type="button" onClick={this.handleChange} value="Book" />

        <BookDialog visible={this.state.dialogVisible} products={this.props.products} />
	  </div>
    );
  }
}

export default BookButton;
