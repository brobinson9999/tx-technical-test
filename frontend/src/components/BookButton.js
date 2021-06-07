import React, { Component } from "react";
import { render } from "react-dom";
import BookDialog from "./BookDialog";

class BookButton extends Component {
  constructor(props) {
    super(props);
	this.state = {
		dialogVisible: false
	};

	this.cancelDialog = this.cancelDialog.bind(this);	
	this.confirmDialog = this.confirmDialog.bind(this);	

	this.handleChange = this.handleChange.bind(this);	
  }

  cancelDialog(event)
  {
    this.setState({dialogVisible: false});
  }

  confirmDialog(event)
  {
    this.setState({dialogVisible: false});
  }

  handleChange(event)
  {
    this.setState({dialogVisible: true});
  }

  render() {
    return (
	  <div>
        <input type="button" onClick={this.handleChange} value="Book" />

        <BookDialog visible={this.state.dialogVisible} products={this.props.products} onCancel={this.cancelDialog} onConfirm={this.confirmDialog} />
	  </div>
    );
  }
}

export default BookButton;
