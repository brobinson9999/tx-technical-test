import React, { Component } from "react";
import { render } from "react-dom";

class ReturnConfirmationDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	if (this.props.visible == false)
		return null;

    return (
      <div>
		Your total price is ${this.props.price}.
		<br />
		Do you want to proceed?
	  
		<input type="button" value="Cancel" />
		<input type="button" value="Confirm" />
	  </div>
    );
  }
}

export default ReturnConfirmationDialog;
