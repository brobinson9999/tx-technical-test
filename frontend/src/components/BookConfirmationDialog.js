import React, { Component } from "react";
import { render } from "react-dom";

class BookConfirmationDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	if (this.props.visible == false)
		return null;

    return (
      <div>
		Your estimated price is ${this.props.estimated_price}.
		<br />
		Do you want to proceed?
	  
		<input type="button" value="Cancel" onClick={this.props.onCancel} />
		<input type="button" value="Confirm" onClick={this.props.onConfirm} />
	  </div>
    );
  }
}

export default BookConfirmationDialog;
