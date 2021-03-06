import React, { Component } from "react";
import { render } from "react-dom";
import ReturnDialog from "./ReturnDialog";

class ReturnButton extends Component {
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
	this.props.onChange(event);
  }

  handleChange(event)
  {
    this.setState({dialogVisible: true});
  }

  render() {
    return (
	  <div>
        <input type="button" onClick={this.handleChange} value="Return" />

        <ReturnDialog visible={this.state.dialogVisible} products={this.props.products} bookings={this.props.bookings} onCancel={this.cancelDialog} onConfirm={this.confirmDialog} />
	  </div>
    );
  }
}

export default ReturnButton;
